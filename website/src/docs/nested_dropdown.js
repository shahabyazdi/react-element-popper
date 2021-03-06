import React, { useState } from "react"
import ElementPopper from "../../../index"

export default function (translate, language, Code) {
  const [state, setState] = useState({})
  const [state1, setState1] = useState(false)

  const updateState = number => setState1({ ...state1, [number]: !state1[number] })

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

  const mainList = (
    <div className="dropdown">
      {[1, 2, 3, 4].map((number, index) => (
        <div
          key={index}
          className="item"
          onMouseOver={() => setState({ main: true, ["item" + number]: true })}
        >
          <ElementPopper
            containerStyle={{
              width: "120px"
            }}
            element={(
              <>
                <span>{translate("item")} {number}</span>
                <span style={{ float: language === "en" ? "right" : "left" }}>{">"}</span>
              </>
            )}
            popper={state["item" + number] && list}
            position={language === "en" ? "right-top" : "left-top"}
          />
        </div>
      ))}
    </div>
  )

  const simpleExample = {
    title: "Simple Example",
    description: "simple_nested",
    code: `import React, { useState } from "react"
import ElementPopper from "react-element-popper"

export default function App() {
  const [state, setState] = useState(false)

  const updateState = number => setState({ ...state, [number]: !state[number] })

  const Button = ({ number }) => (
    <button onClick={() => updateState(number)}>${translate("click here")}</button>
  )

  return (
    <ElementPopper
      position="${language === "en" ? "right" : "left"}"
      element={<Button number={1} />}
      popper={state[1] && (
        <ElementPopper
          position="${language === "en" ? "right" : "left"}"
          element={<Button number={2} />}
          popper={state[2] && (
            <ElementPopper
              position="${language === "en" ? "right" : "left"}"
              element={<Button number={3} />}
              popper={state[3] && <button>${translate("last one")}</button>}
            />
          )}
        />
      )}
    />
  )
}`,
    jsx: <ElementPopper
      position={language === "en" ? "right" : "left"}
      element={<Button number={1} />}
      popper={state1[1] && (
        <ElementPopper
          position={language === "en" ? "right" : "left"}
          element={<Button number={2} />}
          popper={state1[2] && (
            <ElementPopper
              position={language === "en" ? "right" : "left"}
              element={<Button number={3} />}
              popper={state1[3] && <button>{translate("last one")}</button>}
            />
          )}
        />
      )}
    />
  }

  const dropdown = {
    title: "Nested DropDown",
    description: <>
      <p>{translate("nested_dropdown")}</p>
      <p>{translate("style.css:")}</p>
      <pre>
        <code className="language-css">{
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

.dropdown li:hover,
.dropdown div.item:hover {
  background: #ddd;
}

.dropdown div.item {
  cursor: pointer;
  height: 26px;
}`
        }
        </code>
      </pre>
      <p>{translate("code")}:</p>
      <pre>
        <code className="language-jsx">
          {
            `import React, { useState } from "react"
import ElementPopper from "react-element-popper"

export default function App() {
  const [state, setState] = useState({})

  const list = (
    <ul className="dropdown">
      <li>${translate("item 1")}</li>
      <li>${translate("item 2")}</li>
      <li>${translate("item 3")}</li>
      <li>${translate("item 4")}</li>
    </ul>
  )
        
  const mainList = (
    <div className="dropdown">
      {[1, 2, 3, 4].map((number, index) => (
        <div
          key={index}
          className="item"
          onMouseOver={() => setState({ 
            main: true, 
            ["item" + number]: true 
          })}
        >
          <ElementPopper
            containerStyle={{ width: "120px" }}
            element={(
              <>
                <span>${translate("item")} {number}</span>
                <span style={{ float: "${language === "en" ? "right" : "left"}" }}>{">"}</span>
              </>
            )}
            popper={state["item" + number] && list}
            position="${language === "en" ? "right-top" : "left-top"}"
          />
        </div>
      ))}
    </div>
  )

  return (
    <ElementPopper
      element={(
        <button
          onClick={() => setState({ main: !state.main })}
        >
          ${translate("click here")}
        </button>
      )}
      popper={state.main && mainList}
      position="${language === "en" ? "bottom-left" : "bottom-right"}"
    />
  )
}`
          }
        </code>
      </pre>
    </>,
    jsx: <div style={{ marginBottom: "40px" }}>
      <ElementPopper
        element={(
          <button
            onClick={() => setState({ main: !state.main })}
          >
            {translate("click here")}
          </button>
        )}
        popper={state.main && mainList}
        position={language === "en" ? "bottom-left" : "bottom-right"}
      />
    </div>
  }

  return [
    simpleExample,
    dropdown
  ]
}