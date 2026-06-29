from langchain_google_genai import GoogleGenerativeAI
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate

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

if __name__ == "__main__":
  print(generate_pet_name('cat','black'))


