# Weather Agent

An LLM-powered weather agent built with LangChain and LangGraph. The agent can use a weather API as a tool, maintain short-term conversation memory, and answer follow-up questions based on previous context.

## Features

- LLM-powered agent using Groq
- Tool calling for retrieving current weather
- OpenWeatherMap API integration
- Short-term conversation memory using LangGraph
- Context-aware follow-up questions
- Weather-based recommendations and discussion
- Interactive terminal interface

## How It Works

The agent uses an LLM to understand the user's request and decide when it needs to call the weather tool.

```text
                    User
                      |
                      v
                LangChain Agent
                      |
                      v
                     LLM
                      |
             Does it need weather?
                /           \
              Yes            No
               |              |
               v              v
        get_weather()      LLM response
               |
               v
       OpenWeatherMap API
               |
               v
          Weather data
               |
               v
              LLM
               |
               v
         Final response
```

Conversation state is stored using LangGraph's `InMemorySaver`, allowing the agent to remember previous messages during the current session.

## Tech Stack

- Python
- LangChain
- LangGraph
- Groq
- OpenWeatherMap API
- OpenAI GPT-OSS 120B
- python-dotenv

## Project Structure

```text
weather-agent/
│
├── main.py
├── requirements.txt
├── .gitignore
└── README.md
```

`.env` is not included in the repository because it contains API keys.

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/h-arshadd/weather-agent.git
cd weather-agent
```

### 2. Create a virtual environment

Windows:

```powershell
python -m venv venv
```

Activate it:

```powershell
.\venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```powershell
pip install -r requirements.txt
```

### 4. Add environment variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
```

You need API keys from:

- Groq
- OpenWeatherMap

### 5. Run the agent

```powershell
python main.py
```

## Example

```text
You: hi. tell me about weather in [location]

Agent: The current weather in [location] is ...

You: is this good weather to go for a walk?

Agent: If you enjoy cooler weather, this looks like a good time
for a walk ...

You: what city did i ask you about?

Agent: You asked about [location].
```

The agent can use information from earlier messages because short-term conversation memory is enabled.

## Agent and Tool Calling

The weather functionality is exposed to the LLM as a tool:

```python
@tool
def get_weather(location: str) -> str:
    """Get current weather information for a location."""
    return weather_wrapper.run(location)
```

The LLM decides when this tool is necessary.

For example, a request that does not require current weather can be answered directly:

```text
User: What is a good time to go for a walk?

LLM → Responds directly
```

A request for current weather requires the tool:

```text
User: What's the weather in [location]?

LLM → Calls get_weather("[location]")
    → OpenWeatherMap
    → Receives weather data
    → Generates response
```

## Short-Term Memory

The agent uses LangGraph's `InMemorySaver` as a checkpointer.

A `thread_id` identifies the conversation:

```python
config = {
    "configurable": {
        "thread_id": "weather_agent_thread"
    }
}
```

As long as the application is running with the same thread, the agent can access previous messages in that conversation.

This memory is stored in RAM, so it is **not persistent**. Restarting the application clears the conversation history.

## Limitations

- Memory is lost when the application stops.
- Weather information depends on the OpenWeatherMap API.
- The agent currently runs through the terminal.
- No database or persistent memory is implemented.

## Future Improvements

- Add persistent conversation memory
- Build a FastAPI backend
- Add a web interface
- Add more tools
- Store conversations in PostgreSQL
- Deploy the application

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.