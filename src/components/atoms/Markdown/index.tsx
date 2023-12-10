import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function Markdown(props: { markdown: string }) {
  const { markdown } = props
  return (
    <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
      {markdown}
    </ReactMarkdown>
  )
}

export default Markdown
