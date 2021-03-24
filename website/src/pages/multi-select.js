import React from "react"
import Layout from "../components/layout/layout"
import doc from "../docs/multi_select"

export default function MultiSelect({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={doc} />
  )
}