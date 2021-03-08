import React, { useEffect, useRef, useState } from "react"
import ElementPopper from "../../../index"

export default function (translate, language) {
  const [elementCenter, setElementCenter] = useState(100)
  const elementRef = useRef()
  const parentRef = useRef()

  useEffect(() => {
    function handleScroll() {
      const { top: parentTop } = parentRef.current.getBoundingClientRect()
      const { top: elementTop, height: elementHeight } = elementRef.current.getBoundingClientRect()
      const elementCenter = (elementTop - parentTop) + (elementHeight / 2)

      setElementCenter(elementCenter)
    }

    document.addEventListener("scroll", handleScroll, true)

    return () => document.removeEventListener("scroll", handleScroll, true)
  }, [])

  const howItWork = {
    title: "Core Concepts",
    jsx: <>
      <p>{translate("core_concepts_description")}</p>
      <ul>
        {(translate("core_concepts") || []).map((description, index) => (
          <li key={index}>{description}</li>
        ))}
      </ul>

      <div
        className="element-popper-container"
        style={{
          width: "70%",
          margin: "40px auto",
          padding: "10px",
          textAlign: "center",
          border: "1px dashed black",
          position: "relative",
          fontSize: "11px"
        }}
      >
        <p>{translate("container with inline-block display")}</p>
        <div
          style={{
            border: "1px solid black",
            padding: "5px 0",
            boxShadow: "0 0 4px #ccc"
          }}
        >
          <p>{translate("Refrence Element")}</p>
        </div>
        <div
          style={{
            border: "1px dashed black",
            margin: "10px 0",
            padding: "10px"
          }}
        >
          {translate("Arrow (optional)")}
        </div>
        <div
          style={{
            border: "1px dashed black",
            margin: "10px 0",
            padding: "10px"
          }}
        >
          <p>{translate("container with absolute position")}</p>
          <div
            style={{
              border: "1px dashed black",
              margin: "10px 0",
              padding: "10px"
            }}
          >
            <p>{translate("container with static position")}</p>
            <div
              style={{
                border: "1px solid black",
                margin: "10px 0",
                boxShadow: "0 0 4px #ccc"
              }}
            >
              <p>{translate("Popper Element")}</p>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", top: "-25px", left: "0" }}>top-start</div>
        <div style={{ position: "absolute", top: "-25px", right: "0" }}>top-end</div>
        <div style={{ position: "absolute", top: "-25px", left: "50%", transform: "translateX(-50%)" }}>top-center</div>
        <div style={{ position: "absolute", top: "0", left: "-110px", width: "100px", textAlign: "right" }}>left-start</div>
        <div style={{ position: "absolute", top: "50%", left: "-110px", width: "100px", textAlign: "right", transform: "translateY(-50%)" }}>left-center</div>
        <div style={{ position: "absolute", bottom: "0", left: "-110px", width: "100px", textAlign: "right" }}>left-end</div>
        <div style={{ position: "absolute", top: "0", right: "-110px", width: "100px", textAlign: "left" }}>right-start</div>
        <div style={{ position: "absolute", top: "50%", right: "-110px", width: "100px", textAlign: "left", transform: "translateY(-50%)" }}>right-center</div>
        <div style={{ position: "absolute", bottom: "0", right: "-110px", width: "100px", textAlign: "left" }}>right-end</div>
        <div style={{ position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)" }}>bottom-center</div>
        <div style={{ position: "absolute", bottom: "-20px", right: "0" }}>bottom-end</div>
        <div style={{ position: "absolute", bottom: "-20px", left: "0" }}>bottom-start</div>
      </div>
    </>
  }

  const popperDescription = {
    title: "Reference and Popper Larger Than Parent",
    jsx: <>
      <div style={{
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        height: "200px",
        width: "70%"
      }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              height: ((Math.round(elementCenter || 100) - 10) + "px"),
              borderTop: "2px solid",
              [language === "en" ? "borderLeft" : "borderRight"]: "2px solid",
              borderColor: elementCenter >= 100 ? "green" : "red"
            }}
          />
          <div style={{
            marginBottom: "5px",
            [language === "en" ? "marginLeft" : "marginRight"]: `-${language === "en" ? "20" : "12"}px`
          }}>{translate("center")}</div>
          <div
            style={{
              flex: "1",
              borderBottom: "2px solid",
              [language === "en" ? "borderLeft" : "borderRight"]: "2px solid",
              borderColor: elementCenter < 100 ? "green" : "red"
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ flex: "1" }} />
          <div>-</div>
          <div style={{ flex: "1" }} />
        </div>
        <div
          ref={parentRef}
          style={{
            backgroundColor: "whitesmoke",
            overflow: "auto",
            position: "relative",
            borderRadius: "5px",
            boxShadow: "inset 0 0 6px 0 #888",
            height: "200px",
            width: "100%"
          }}
        >
          <div
            style={{
              height: "150%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <ElementPopper
              containerStyle={{ width: "max-content", margin: "auto" }}
              style={{ width: "100%", height: "26px", boxSizing: "border-box" }}
              element={
                <div
                  ref={elementRef}
                  style={{
                    backgroundColor: "red",
                    height: "80px",
                    width: "80px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  {translate("Refrence Element")}
                </div>
              }
              popper={
                <div
                  style={{
                    width: "110px",
                    height: "110px",
                    backgroundColor: "white",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  {translate("Popper Element")}
                </div>
              }
              arrow
              popperShadow
            />
          </div>
        </div>
      </div>

      {translate("popper_larger_parent").map((string, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: `<p>${string}</p>` }} />
      ))}
    </>
  }

  const importantNotes = {
    title: "Important Notes",
    description: <ol>
      {translate("important_notes").map((note, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: `<li>${note}</li>` }} />
      ))}
    </ol>
  }

  return [
    howItWork,
    popperDescription,
    importantNotes
  ]
}

function Example() {

}
