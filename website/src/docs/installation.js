import React from "react"

export default function (translate) {
  const npm = {
    title: "npm",
    description: translate("npm_description"),
    code: `npm install --save react-element-popper`
  }

  const yarn = {
    title: "yarn",
    description: translate("yarn_description"),
    code: `yarn add react-element-popper`
  }

  const usage = {
    title: "Usage",
    code: `import React from "react";
import ElementPopper from "react-element-popper";
import "react-element-popper/build/element_popper.css"; // arrow styles and shadow

export default function Example() {
  const Component = ({ size, backgroundColor, children }) => {
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
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <ElementPopper
      element={
        <Component size="80" backgroundColor="red">
          Refrence Element
        </Component>
      }
      popper={
        <Component size="100" backgroundColor="white">
          Popper Element
        </Component>
      }
      arrow
      popperShadow
    />
  );
}`
  }

  return [
    npm,
    yarn,
    usage
  ]
}