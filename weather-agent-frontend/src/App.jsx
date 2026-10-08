import Background from "./components/Background";
import Mascot from "./components/Mascot";
import MessageList from "./components/MessageList";
import Suggestions from "./components/Suggestions";
import ChatInput from "./components/ChatInput";
import { useChat } from "./hooks/useChat";

const GREETING = "Hi! I'm your weather buddy 🌤️ Tell me a city and I'll check the sky for you!";

export default function App() {
  const { messages, weather, isLoading, send } = useChat();

  return (
    <>
      <Background />

      <main className="card">
        <header className="hero">
          <h1>Weather Agent</h1>
          <p className="hero__subtitle">ask me about the sky ☁️</p>
          <Mascot weather={weather} thinking={isLoading} />
          <p className="bubble">{GREETING}</p>
        </header>

        {messages.length === 0 ? (
          <Suggestions onPick={send} />
        ) : (
          <MessageList messages={messages} isLoading={isLoading} />
        )}

        <ChatInput onSend={send} disabled={isLoading} />
      </main>
    </>
  );
}