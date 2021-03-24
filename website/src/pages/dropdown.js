import React from "react"
import Layout from "../components/layout/layout"
import doc from "../docs/dropdown"

export default function DropDown({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={doc} />
  )
}