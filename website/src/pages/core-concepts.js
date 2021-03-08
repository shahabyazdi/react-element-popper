import React from "react"
import Layout from "../components/layout/layout"
import doc from "../docs/core_concepts"

export default function HowItWork({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={doc} />
  )
}