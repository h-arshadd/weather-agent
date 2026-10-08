import os
import re
from typing import Literal, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agent import agent

Weather = Literal["clear", "clouds", "rain", "snow", "storm"]

# Checked in order, first match wins (so "thunderstorm" beats "rain")
CONDITION_KEYWORDS: list[tuple[tuple[str, ...], Weather]] = [
    (("thunderstorm",), "storm"),
    (("snow", "sleet"), "snow"),
    (("rain", "drizzle"), "rain"),
    (("clear",), "clear"),
    (("cloud", "overcast", "mist", "fog", "haze"), "clouds"),
]

# The weather tool returns a line like "Detailed status: light rain"
STATUS_PATTERN = re.compile(r"Detailed status:\s*(.+)", re.IGNORECASE)

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app = FastAPI(title="Weather Agent")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


class ChatRequest(BaseModel):
    message: str
    session_id: str


class ChatResponse(BaseModel):
    reply: str
    weather: Optional[Weather] = None


def to_weather(status: str) -> Optional[Weather]:
    status = status.lower()
    for keywords, weather in CONDITION_KEYWORDS:
        if any(keyword in status for keyword in keywords):
            return weather
    return None


def extract_weather(messages: list) -> Optional[Weather]:
    """Weather from the latest tool call made during this turn, if any."""
    last_user_index = max(i for i, m in enumerate(messages) if m.type == "human")

    for message in reversed(messages[last_user_index:]):
        if message.type != "tool":
            continue
        match = STATUS_PATTERN.search(message.content)
        if match:
            return to_weather(match.group(1))

    return None


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    result = agent.invoke(
        {"messages": [{"role": "user", "content": request.message}]},
        {"configurable": {"thread_id": request.session_id}},
    )
    messages = result["messages"]

    return ChatResponse(
        reply=messages[-1].content,
        weather=extract_weather(messages),
    )