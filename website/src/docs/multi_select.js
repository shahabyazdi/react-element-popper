import React, { useRef, useState, useEffect } from "react"
import ElementPopper from "../../../index"

export default function (translate, language) {
  const [values, setValues] = useState(["1", "2"])
  const [values1, setValues1] = useState(["1", "2"])

  const multiSelect = {
    title: "Multi Select",
    description: <>

      <p>{translate("style.css:")}</p>
      <pre>
        <code className="language-css">
          {
            `.multi-select {
  border-radius: 5px;
  font-size: 15px;
  min-width: 120px;
  background-color: white;
  box-sizing: border-box;
}
            
.multi-select .placeholder {
  border: 1px #ddd solid;
  background-color: white;
  border-radius: 5px;
  height: 21px;
  font-size: 13px;
  color: rgb(37, 35, 35);
  font-weight: 500;
  cursor: pointer;
  padding: 5px 20px;
}
            
.multi-select .options {
  border: 1px solid #ddd;
  background: white;
  color: black;
  max-height: 300px;
  overflow: auto;
  border-radius: 2px;
}
            
.multi-select .options .option {
  display: block;
  color: rgb(37, 35, 35);
  font-weight: 500px;
  font-size: 14px;
  margin-top: 0;
  padding-top: 2px;
}
            
.multi-select .options .option:hover {
  background-color: dodgerblue;
  color: white;
}`
          }
        </code>
      </pre>
    </>,
    code: `import React, { useRef, useState } from "react"
import ElementPopper from "react-element-popper"

export default function App() {
  const [values, setValues] = useState(["1", "2"])

  return (
    <MultiSelect
      values={values}
      onChange={setValues}
      options={[
        ["option 1", "1"],
        ["option 2", "2"],
        ["option 3", "3"],
        ["option 4", "4"],
        ["option 5", "5"],
      ]}
    />
  )
}
    
function MultiSelect({ options = [], values = [], onChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ref = useRef()

  const mustSelectAll = values.length !== options.length
    
  return (
    <ElementPopper
      ref={ref}
      containerClassName="multi-select"
      element={(
        <div
          className="placeholder"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          click here to select
        </div>
      )}
      popper={isMenuOpen && (
        <div className="options" style={{ width: ref?.current?.clientWidth || "100px" }}>
          <label className="option">
            <input
              type="checkbox"
              checked={!mustSelectAll}
              onChange={selectAll}
            />
            <span>select all</span>
          </label>
          {options.map(([text, value], index) => (
            <label key={index} className="option">
              <input
                type="checkbox"
                value={value}
                checked={values.includes(value)}
                onChange={select}
              />
              <span>{text}</span>
            </label>
          ))}
        </div>
      )}
      offsetY={2}
    />
  )
    
  function selectAll() {
    if (mustSelectAll) {
      values = options.map(option => option[1])
    } else {
      values = []
    }

    if (onChange) onChange(values)
  }

  function select(e) {
    let value = e.target.value

    if (values.includes(value)) {
      values = values.filter(val => val !== value)
    } else {
      values.push(value)
    }

    if (onChange) onChange([...values])
  }
}`,
    jsx: <MultiSelect
      values={values}
      onChange={setValues}
      options={[
        ["option 1", "1"],
        ["option 2", "2"],
        ["option 3", "3"],
        ["option 4", "4"],
        ["option 5", "5"],
      ]}
    />
  }

  const handleClickOutside = {
    title: "Handle Click Outside",
    code: `useEffect(() => {
  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsMenuOpen(false)
    }
  }
  
  document.addEventListener("click", handleClickOutside)
  return () => document.removeEventListener("click", handleClickOutside)
}, [])`,
    jsx: <MultiSelect
      values={values1}
      onChange={setValues1}
      options={[
        ["option 1", "1"],
        ["option 2", "2"],
        ["option 3", "3"],
        ["option 4", "4"],
        ["option 5", "5"],
      ]}
      useClickOutside
    />
  }

  return [
    multiSelect,
    handleClickOutside
  ]
}

function MultiSelect({ options = [], values = [], onChange, useClickOutside = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    if (!useClickOutside) return

    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [useClickOutside])

  const mustSelectAll = values.length !== options.length

  return (
    <ElementPopper
      ref={ref}
      containerClassName="multi-select"
      element={(
        <div
          className="placeholder"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          click here to select
        </div>
      )}
      popper={isMenuOpen && (
        <div className="options" style={{ width: ref?.current?.clientWidth || "100px" }}>
          <label className="option">
            <input
              type="checkbox"
              checked={!mustSelectAll}
              onChange={selectAll}
            />
            <span>select all</span>
          </label>
          {options.map(([text, value], index) => (
            <label className="option" key={index}>
              <input
                type="checkbox"
                value={value}
                checked={values.includes(value)}
                onChange={select}
              />
              <span>{text}</span>
            </label>
          ))}
        </div>
      )}
      offsetY={2}
    />
  )

  function selectAll() {
    if (mustSelectAll) {
      values = options.map(option => option[1])
    } else {
      values = []
    }

    if (onChange) onChange(values)
  }

  function select(e) {
    let value = e.target.value

    if (values.includes(value)) {
      values = values.filter(val => val !== value)
    } else {
      values.push(value)
    }

    if (onChange) onChange([...values])
  }
}
