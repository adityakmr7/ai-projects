from langchain_google_genai import GoogleGenerativeAI
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_classic.agents import initialize_agent
from langchain_classic.agents import AgentType

load_dotenv()

def generate_pet_name(animal_type,pet_color):
  llm = GoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.7)
  # Prompts are the instructions or questions we give to the LLM. 
  prompt_template = PromptTemplate(
    input_variables=['animal_type', 'pet_color'],
    template='I have a {animal_type} pet with color {pet_color} and I want a cool name for it. Suggest me five cool names for my pet.'
  )
  chain = prompt_template | llm
  response = chain.invoke({'animal_type': animal_type, 'pet_color': pet_color})
  return response

def langchain_agent():
  llm = GoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.5)
  tools = load_tools(["llm-math","wikipedia"],llm=llm)
  agent = initialize_agent(
    tools,llm,agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,verbose=True
  )
  result = agent.run("what is the average age of a dog? Multiply the age by 3 and divide it by 2.")
  print(result);


if __name__ == "__main__":
  langchain_agent();
  # print(generate_pet_name('cat','black'))
  # print(langchain_agent("What is the square root of 48765?!"))


