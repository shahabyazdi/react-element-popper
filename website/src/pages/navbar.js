import React from "react"
import Layout from "../components/layout/layout"
import doc from "../docs/navbar"

export default function NavBar({ pageContext }) {
  const language = pageContext.language || "en"

  return (
    <Layout language={language} doc={doc} />
  )
}