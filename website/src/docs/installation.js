import React from "react"

export default function (translate, language, Code) {
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

  const basicImport = {
    title: "Basic Import",
    description: "basic_import",
    code: `import ElementPopper from "react-element-popper"`,
    jsx: <>
      <Code title="basic_import2">
        import "react-element-popper/build/element_popper.css"
      </Code>
    </>,
  }

  const usage = {
    title: "Usage",
    code: `import React from "react"
import ElementPopper from "react-element-popper"

export default function Example() {
  const Div = ({ children }) => (
    <div
      style={{
        border: "1px solid black",
        backgroundColor: "white"
      }}
    >
      { children}
    </div>
  )

  return (
    <ElementPopper
      element={<Div>Refrence Element</Div>}
      popper={<Div>Popper Element</Div>}
    />
  )
}`
  }

  return [
    npm,
    yarn,
    basicImport,
    usage
  ]
}