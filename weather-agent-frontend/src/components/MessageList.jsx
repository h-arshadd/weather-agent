import { useEffect, useRef } from "react";
import Markdown from "./Markdown";

function TypingDots() {
  return (
    <div className="dots" aria-label="Agent is typing">
      <span />
      <span />
      <span />
    </div>
  );
}

export default function MessageList({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="chat">
      {messages.map(({ id, role, text }) => (
        <div key={id} className={`msg msg--${role}`}>
          {role === "agent" ? <Markdown>{text}</Markdown> : text}
        </div>
      ))}

      {isLoading && (
        <div className="msg msg--agent">
          <TypingDots />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}