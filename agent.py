from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain.tools import tool
from langchain_community.utilities.openweathermap import OpenWeatherMapAPIWrapper
from langchain_groq import ChatGroq
from langgraph.checkpoint.memory import InMemorySaver

load_dotenv()

llm = ChatGroq(model="openai/gpt-oss-120b")

weather_wrapper = OpenWeatherMapAPIWrapper()


@tool
def get_weather(location: str) -> str:
    """Get current weather information for a location."""
    return weather_wrapper.run(location)


agent = create_agent(
    model=llm,
    tools=[get_weather],
    checkpointer=InMemorySaver(),
    system_prompt=(
        "You are a cute, friendly weather agent that can search for information regarding weather conditions. "
        "Keep replies short and conversational. "
        "Use bold, short lists, or a small table only when it genuinely helps "
        "Use an emoji or two at most."
    ),
)