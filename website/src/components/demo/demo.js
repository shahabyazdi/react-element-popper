import React, { useState, useRef, useEffect } from "react";
import Selectors from "../selectors/selectors";
import ElementPopper from "../../../../src/index";
import "./demo.css";

export default function Demo({ language = "en", translate }) {
  const [state, setState] = useState({
    mainPosition: "bottom",
    relativePosition: "center",
    fixMainPosition: false,
    fixRelativePosition: false,
    offsetY: 0,
    offsetX: 0,
    arrow: true,
    shadow: true,
  });
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollTo(
      (containerRef.current.clientWidth + 115) * (language === "en" ? 1 : -1),
      containerRef.current.clientHeight
    );
  }, [language]);

  const updateState = (key, value) => {
    if (typeof key === "object") {
      setState({ ...state, ...key });
    } else {
      setState({ ...state, [key]: value });
    }
  };

  const {
    mainPosition,
    relativePosition,
    fixMainPosition,
    fixRelativePosition,
    offsetY,
    offsetX,
    arrow,
    shadow,
  } = state;

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
          fontSize: "16px",
        }}
      >
        {translate(children)}
      </div>
    );
  };

  return (
    <>
      <div
        ref={containerRef}
        className="element-popper-container"
        style={{
          margin: "20px auto",
          backgroundColor: "whitesmoke",
          height: "400px",
          width: "80%",
          overflow: "auto",
          position: "relative",
          borderRadius: "5px",
          boxShadow: "inset 0 0 6px 0 #888",
        }}
      >
        <div
          style={{
            width: "350%",
            height: "300%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ElementPopper
            containerStyle={{ width: "max-content", margin: "auto" }}
            style={{ width: "100%", height: "26px", boxSizing: "border-box" }}
            element={
              <Component size="80" backgroundColor="red">
                Refrence Element
              </Component>
            }
            popper={
              <Component size="110" backgroundColor="white">
                Popper Element
              </Component>
            }
            arrow={arrow}
            popperShadow={shadow}
            position={mainPosition + "-" + relativePosition}
            fixMainPosition={fixMainPosition}
            fixRelativePosition={fixRelativePosition}
            offsetY={offsetY}
            offsetX={offsetX}
          />
        </div>
      </div>

      <Selectors
        translate={translate}
        selectors={[
          {
            title: "Main Position",
            options: [
              ["Top", "top"],
              ["Bottom", "bottom"],
              ["Left", "left"],
              ["Right", "right"],
            ],
            value: mainPosition,
            onChange: (value) => updateState("mainPosition", value),
          },
          {
            title: "Relative Position",
            options: [
              ["Start", "start"],
              ["Center", "center"],
              ["End", "end"],
            ],
            value: relativePosition,
            onChange: (value) => updateState("relativePosition", value),
          },
          {
            title: "Fix Main Position",
            options: [
              ["Disable", "disable"],
              ["Enable", "enable"],
            ],
            value: fixMainPosition ? "enable" : "disable",
            onChange: (value) =>
              updateState("fixMainPosition", value === "enable"),
          },
          {
            title: "Fix Relative Position",
            options: [
              ["Disable", "disable"],
              ["Enable", "enable"],
            ],
            value: fixRelativePosition ? "enable" : "disable",
            onChange: (value) =>
              updateState("fixRelativePosition", value === "enable"),
          },
          {
            title: "Arrow",
            options: [
              ["Disable", "disable"],
              ["Enable", "enable"],
            ],
            value: arrow ? "enable" : "disable",
            onChange: (value) => updateState("arrow", value === "enable"),
          },
          {
            title: "Shadow",
            options: [
              ["Disable", "disable"],
              ["Enable", "enable"],
            ],
            value: shadow ? "enable" : "disable",
            onChange: (value) => updateState("shadow", value === "enable"),
          },
        ]}
      />

      <div className="display-flex">
        <div className="form-group flex-1">
          <label>{translate("Offset Y")}</label>
          <input
            className="input full-width"
            type="number"
            value={offsetY}
            onChange={(e) => updateState("offsetY", Number(e.target.value))}
            disabled={["left", "right"].includes(mainPosition)}
          />
        </div>

        <div className="form-group flex-1">
          <label>{translate("Offset X")}</label>
          <input
            className="input full-width"
            type="number"
            value={offsetX}
            onChange={(e) => updateState("offsetX", Number(e.target.value))}
            disabled={["top", "bottom"].includes(mainPosition)}
          />
        </div>
      </div>

      <h3>{translate("Descriptions")}:</h3>
      <ul>
        {translate("demo_descriptions").map((description, index) => (
          <li key={index}>{description}</li>
        ))}
      </ul>
    </>
  );
}
