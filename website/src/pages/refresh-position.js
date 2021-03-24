import React from "react"
import Layout from "../components/layout/layout"
import doc from "../docs/refresh_position"

export default function RefreshPosition({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={doc} />
  )
}