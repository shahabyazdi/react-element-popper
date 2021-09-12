import React, { useState } from "react";
import ElementPopper from "../../../src";

const styles = {
  wrapper: {
    position: "relative",
    overflow: "hidden",
    height: "60px",
    width: "150px",
    backgroundColor: "#aaa",
    borderRadius: "5px",
    padding: "5px",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "inset 0 0 5px black",
  },
  container: {
    margin: "auto",
  },
  element: {
    backgroundColor: "white",
    margin: "5px 10px",
    padding: "5px",
    borderRadius: "5px",
    boxShadow: "0 0 3px black",
    cursor: "default",
    fontSize: "14px",
  },
  popper: {
    height: "50px",
    backgroundColor: "black",
    color: "white",
    borderRadius: "5px",
    padding: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export default function Doc() {
  const portal = {
    title: "Portal",
    code: `import React, { useState } from "react";
import ElementPopper from "react-element-popper";

const styles = {
  wrapper: {
    position: "relative",
    overflow: "hidden",
    height: "60px",
    width: "150px",
    backgroundColor: "#aaa",
    borderRadius: "5px",
    padding: "5px",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "inset 0 0 5px black",
  },
  container: {
    margin: "auto",
  },
  element: {
    backgroundColor: "white",
    margin: "5px 10px",
    padding: "5px",
    borderRadius: "5px",
    boxShadow: "0 0 3px black",
    cursor: "default",
    fontSize: "14px",
  },
  popper: {
    height: "50px",
    backgroundColor: "black",
    color: "white",
    borderRadius: "5px",
    padding: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

function Tooltip({ label, text, ...props }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ElementPopper
      containerStyle={styles.container}
      element={
        <div
          style={styles.element}
          onMouseOver={toggleVisible}
          onMouseLeave={toggleVisible}
        >
          {label}
        </div>
      }
      popper={isVisible && <div style={styles.popper}>{text}</div>}
      {...props}
    />
  );

  function toggleVisible() {
    setIsVisible(!isVisible);
  }
}

export default function Example(){
  return (
    <div style={styles.wrapper}>
      <Tooltip label="default" text="default" />
      <Tooltip label="portal" text="portal" portal />
    </div>
  )
}
`,
    jsx: (
      <div style={styles.wrapper}>
        <Tooltip label="default" text="default" />
        <Tooltip label="portal" text="portal" portal />
      </div>
    ),
  };

  return [portal];
}

function Tooltip({ label, text, ...props }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ElementPopper
      containerStyle={styles.container}
      element={
        <div
          style={styles.element}
          onMouseOver={toggleVisible}
          onMouseLeave={toggleVisible}
        >
          {label}
        </div>
      }
      popper={isVisible && <div style={styles.popper}>{text}</div>}
      {...props}
    />
  );

  function toggleVisible() {
    setIsVisible(!isVisible);
  }
}
