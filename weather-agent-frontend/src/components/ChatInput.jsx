import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;

    onSend(text);
    setValue("");
  };

  return (
    <form className="input-bar" onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="what's the weather in..."
        autoComplete="off"
      />
      <button type="submit" disabled={disabled}>
        Send
      </button>
    </form>
  );
}