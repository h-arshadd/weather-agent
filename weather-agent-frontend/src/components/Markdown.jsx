import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Wide tables scroll inside the bubble instead of breaking the layout
const components = {
  table: ({ children }) => (
    <div className="table-wrap">
      <table>{children}</table>
    </div>
  ),
};

export default function Markdown({ children }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}