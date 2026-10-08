from langchain_groq import ChatGroq
from langchain.agents import create_agent
from langchain.tools import tool
from langgraph.checkpoint.memory import InMemorySaver  
from langchain_community.utilities.openweathermap import OpenWeatherMapAPIWrapper
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(
    model="openai/gpt-oss-120b"
)

weather_wrapper = OpenWeatherMapAPIWrapper()

@tool
def get_weather(location: str) -> str:
    """Get current weather information for a location."""
    return weather_wrapper.run(location)

agent = create_agent(
    model=llm,
    tools=[get_weather],
    checkpointer=InMemorySaver(),
    system_prompt="You are a helpful weather agent that can search for information regarding weather conditions."
)

while True:
    query = input("You: ")

    if query.lower() in ["exit", "quit"]:
        break

    result = agent.invoke(
        {"messages": [{"role": "user", "content": query}]},
        {"configurable": {"thread_id": "weather_agent_thread"}},
    )

    print("Agent:", result["messages"][-1].content)