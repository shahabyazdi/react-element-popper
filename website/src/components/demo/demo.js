import React, { useState } from "react"
import Selectors from "../selectors/selectors"
import "./demo.css"

export default function Demo({ language = "en", translate }) {
  const [state, setState] = useState({})

  const updateState = (key, value) => {
    if (typeof key === "object") {
      setState({ ...state, ...key })
    } else {
      setState({ ...state, [key]: value })
    }
  }

  return (
    <>
      <div className="calendar-demo">
        DEMO
      </div>

      <Selectors
        selectors={[]}
      />

      <h3>{translate("Descriptions")}:</h3>
    </>
  )
}