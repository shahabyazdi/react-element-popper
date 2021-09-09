import React, { useState, useRef } from "react";
import ElementPopper from "../../../src/index";

export default function Doc(translate) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const globalProps = {
    element: (
      <Component size={80} backgroundColor="red" translate={translate}>
        Refrence Element
      </Component>
    ),
    popper: (
      <Component size={100} backgroundColor="white" translate={translate}>
        Popper Element
      </Component>
    ),
    position: "bottom",
    fixMainPosition: true,
    popperShadow: true,
    arrow: true,
  };

  const refresh = {
    title: "Refreshing Position",
    description: "refresh_position",
    code: `import React, { useState, useRef } from "react"
import ElementPopper from "react-element-popper"
import "react-element-popper/build/element_popper.css"

export default function App() {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const ref = useRef()

  const globalProps = {
    element: (
      <Component 
        size={80}
        backgroundColor="red"
      >
        Refrence Element
      </Component>
    ),
    popper: (
      <Component 
        size={100}
        backgroundColor="white"
      >
        Popper Element
      </Component>
    ),
    position: "bottom",
    fixMainPosition: true,
    popperShadow: true,
    arrow: true
  }

  return (
    <div>
      <div style={{ marginBottom: "150px", padding: "0 10px" }}>
        <h2>${translate("Example 1 (without using refresh position)")} :</h2>
        {visible && <span>${translate(
          "a demo text to force the refrence element to move forward!"
        )}</span>}
        <ElementPopper {...globalProps} />
        <button
          onClick={() => setVisible(!visible)}
        >
          {visible ? "${translate("refresh")}" : "${translate("click here")}"}
        </button>
      </div>
    
      <div style={{ marginBottom: "150px", padding: "0 10px" }}>
        <h2>${translate("Example 2 (with using refresh position)")} :</h2>
        {visible2 && <span>${translate(
          "a demo text to force the refrence element to move forward!"
        )}</span>}
        <ElementPopper ref={ref} {...globalProps} />
        <button
          onClick={() => {
            setVisible2(!visible2)
          
            ref.current.refreshPosition()
          }}
        >
          {visible2 ? "${translate("refresh")}" : "${translate("click here")}"}
        </button>
      </div>
    </div>
  )
}`,
    jsx: (
      <div>
        <div style={{ marginBottom: "150px", padding: "0 10px" }}>
          <h2>{translate("Example 1 (without using refresh position)")} :</h2>
          {visible && (
            <span>
              {translate(
                "a demo text to force the refrence element to move forward!"
              )}
            </span>
          )}
          <ElementPopper {...globalProps} />
          <button onClick={() => setVisible(!visible)}>
            {visible ? translate("refresh") : translate("click here")}
          </button>
        </div>

        <div style={{ marginBottom: "150px", padding: "0 10px" }}>
          <h2>{translate("Example 2 (with using refresh position)")} :</h2>
          {visible2 && (
            <span>
              {translate(
                "a demo text to force the refrence element to move forward!"
              )}
            </span>
          )}
          <ElementPopper ref={ref} {...globalProps} />
          <button
            onClick={() => {
              setVisible2(!visible2);

              ref.current.refreshPosition();
            }}
          >
            {visible2 ? translate("refresh") : translate("click here")}
          </button>
        </div>
      </div>
    ),
  };

  return [refresh];
}

function Component({ size, backgroundColor, children, translate }) {
  return (
    <div
      style={{
        width: size + "px",
        height: size + "px",
        backgroundColor,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontSize: "16px",
      }}
    >
      {translate(children)}
    </div>
  );
}
