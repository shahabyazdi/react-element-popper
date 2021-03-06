import React from "react"
import Layout from "../components/layout/layout"
import doc from "../docs/nested_dropdown"

export default function NestedDropDown({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={doc} />
  )
}