import React, { useState } from "react"
import ElementPopper from "../../../index"

export default function (translate, language, Code) {
  const [state, setState] = useState({})

  const updateState = number => setState({ ...state, [number]: !state[number] })

  const Button = ({ number }) => (
    <button onClick={() => updateState(number)}>{translate("click here")}</button>
  )

  const list = (
    <ul className="dropdown">
      <li>{translate("item 1")}</li>
      <li>{translate("item 2")}</li>
      <li>{translate("item 3")}</li>
      <li>{translate("item 4")}</li>
    </ul>
  )

  const dropDown = {
    title: "Simple DropDown",
    description: <>
      {translate("dropdown").map((description, index) => <div key={index} dangerouslySetInnerHTML={{ __html: `<p>${description}</p>` }} />)}

      <Code language="css" title="style.css:">

        {
          `.dropdown {
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
  border: 1px solid black;
}

.dropdown li {
  min-width: 120px;
  cursor: pointer;
  padding: 2px 10px;
}

.dropdown li:hover {
  background: #ddd;
}`
        }
      </Code>

      <p>{translate("code")}:</p>
      <pre>
        <code className="language-jsx">{
          `import React, { useState } from "react"
import ElementPopper from "react-element-popper"

export default function App() {
  const [active, setActive] = useState(false)

  const toggleDropDown = () => setActive(!active)

  const button = (
    <button onClick={toggleDropDown}>${translate("click here")}</button>
  )

  const list = (
    <ul className="dropdown">
      <li>${translate("item 1")}</li>
      <li>${translate("item 2")}</li>
      <li>${translate("item 3")}</li>
      <li>${translate("item 4")}</li>
    </ul>
  )

  return (
    <ElementPopper
      element={button}
      popper={active && list}
      position="${language === "en" ? "bottom-left" : "bottom-right"}"
    />
  )
}`
        }
        </code>
      </pre>
    </>,
    jsx: <ElementPopper
      element={<Button number={1} />}
      popper={state[1] && list}
      position={language === "en" ? "bottom-left" : "bottom-right"}
    />
  }

  const animation = {
    title: "Simple DropDown With Animation",
    description: "dropdown_animation",
    code: `<ElementPopper
  element={button}
  popper={active && list}
  position="${language === "en" ? "bottom-left" : "bottom-right"}"
  animation
/>`,
    jsx: <ElementPopper
      element={<Button number={2} />}
      popper={state[2] && list}
      position={language === "en" ? "bottom-left" : "bottom-right"}
      animation
    />
  }

  const right = {
    title: "Position " + (language === "en" ? "Right" : "Left"),
    description: "dropdown_right",
    code: `<ElementPopper
  element={button}
  popper={active && list}
  position="${language === "en" ? "right-end" : "left-end"}"
/>`,
    jsx: <ElementPopper
      element={<Button number={3} />}
      popper={state[3] && list}
      position={language === "en" ? "right-bottom" : "left-bottom"}
    />
  }

  return [
    dropDown,
    animation,
    right
  ]
}

