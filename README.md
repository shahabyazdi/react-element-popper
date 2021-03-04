# ElementPopper

<div align="center">
  <img src="https://github.com/shahabyazdi/react-element-popper/blob/master/screenshot/screenshot.jpg?raw=true" alt="Element Popper"/>
</div>

## Installation

```code
npm install --save react-element-popper
```

## Usage

```javascript
import React from "react";
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
}
```

## Availble props

| Name                |             Type              |     Default     |
| ------------------- | :---------------------------: | :-------------: |
| element             |      React.ReactElement       |                 |
| popper              |      React.ReactElement       |                 |
| position            |            String             | "bottom-center" |
| arrow               | Boolean or React.ReactElement |      false      |
| fixMainPosition     |            Boolean            |      false      |
| fixRelativePosition |            Boolean            |      false      |
| animation           |            Boolean            |      false      |
| popperShadow        |            Boolean            |      false      |
| active              |            Boolean            |      true       |
| offsetY             |            Number             |        0        |
| offsetX             |            Number             |        0        |
| zIndex              |            Number             |        0        |
| containerStyle      |      React.CSSProperties      |                 |
| arrowStyle          |      React.CSSProperties      |                 |
| containerClassName  |            String             |                 |
| arrowClassName      |            String             |                 |
| ref                 |        React.RefObject        |                 |
| onChange            |           Function            |                 |

## Availble Positions

- `top` or `top-center`
- `bottom` or `bottom-center`
- `left` or `left-center`
- `right` or `right-center`
- `top-start` or `top-left`
- `bottom-start` or `bottom-left`
- `left-start` or `left-top`
- `right-start` or `right-top`
- `top-end` or `top-right`
- `bottom-end` or `bottom-right`
- `left-end` or `left-bottom`
- `right-end` or `right-bottom`
