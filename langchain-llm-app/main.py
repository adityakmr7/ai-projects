import langchain_helper as lch
import streamlit as st

st.title("Personality Insights App")

animal_type = st.text_input("Enter the animal type")
pet_color = st.text_input("Enter the pet color")

if st.button("Generate Name"):
  response = lch.generate_pet_name(animal_type,pet_color)
  st.write(response)