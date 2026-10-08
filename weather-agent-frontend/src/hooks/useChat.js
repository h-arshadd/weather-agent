import { useState } from "react";
import { sendMessage } from "../api";

const ERROR_TEXT =
  "Oops, I can't reach my weather brain right now 🥺 Try again in a bit!";

const createMessage = (role, text) => ({
  id: crypto.randomUUID(),
  role,
  text,
});

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [weather, setWeather] = useState("clear");
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (role, text) =>
    setMessages((prev) => [...prev, createMessage(role, text)]);

  const send = async (text) => {
    addMessage("user", text);
    setIsLoading(true);

    try {
      const data = await sendMessage(text);
      addMessage("agent", data.reply);
      if (data.weather) setWeather(data.weather);
    } catch {
      addMessage("agent", ERROR_TEXT);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, weather, isLoading, send };
}