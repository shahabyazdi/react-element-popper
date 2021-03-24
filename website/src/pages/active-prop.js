import React from "react"
import Layout from "../components/layout/layout"
import doc from "../docs/active_prop"

export default function ActiveProp({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={doc} />
  )
}