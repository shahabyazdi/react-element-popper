# ElementPopper

![ElementPopper](/screenshot/screenshot.jpg?raw=true)

## Installation

```code
npm install --save react-element-popper
```

## Usage

```javascript
import React from "react";

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

| Name                |        Type         |     Default     |
| ------------------- | :-----------------: | :-------------: |
| element             | React.ReactElement  |    undefined    |
| popper              | React.ReactElement  |    undefined    |
| position            |       String        | "bottom-center" |
| arrow               |       Boolean       |      false      |
| fixMainPosition     |       Boolean       |      false      |
| fixRelativePosition |       Boolean       |      false      |
| animation           |       Boolean       |      false      |
| popperShadow        |       Boolean       |      false      |
| offsetY             |       Number        |        0        |
| offsetX             |       Number        |        0        |
| zIndex              |       Number        |        0        |
| containerStyle      | React.CSSProperties |                 |
| arrowStyle          | React.CSSProperties |                 |
| ref                 |   React.RefObject   |    undefined    |
| onChange            |      Function       |    undefined    |

## Availble Positions

- `top` or `top-center`
- `bottom` or `bottom-center`
- `left` or `left-center`
- `right` or `right-center`
- `top-start` or `top-left`
- `bottom-start` or `bottom-left`
- `left-start` or `left-top`
- `right-start` or `righ-top`
- `top-end` or `top-right`
- `bottom-end` or `bottom-right`
- `left-end` or `left-bottom`
- `right-end` or `right-bottom`
