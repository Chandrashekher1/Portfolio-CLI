import { createSlice } from "@reduxjs/toolkit";
import portfolio from "../Data/portfolioData.json";

const initialState = {
  currentDir: "",
  history: [],
};

const cliSlice = createSlice({
  name: "cli",
  initialState,
  reducers: {
    Command: (state, action) => {
      const { input } = action.payload
      const args = input.trim().split(" ")
      const command = args[0].toLowerCase()
      const argument = args[1] || ""
      let output = ""

      switch (command) {
        case "ls":
          if (state.currentDir === "projects") {
            output = portfolio.projects.map((project) => project.name).join("\n")
          } else if (state.currentDir === "") {
            output = `contact  \nskills  \nprojects \neducation \nachievements \nhobbies`
          }
          else if (state.currentDir === "contact") {
            output = Object.keys(portfolio.contact).join("\n")
          }
          else if (state.currentDir === "skills") {
            output = portfolio.skills.map((skill) => skill).join("\n ,  ")
          }
          else if (state.currentDir === "education") {
            output = portfolio.education.map((edu) => edu).join("\n , ")
          }
          else {
            output = `No items in ${state.currentDir}.`
          }
          break

        case "cd":
          if (argument === "projects") {
            state.currentDir = "projects"
            output = "You are now in the projects directory."
          } else if (argument === "..") {
            state.currentDir = ""
            output = "Returned to the root directory."
          }else if (argument === "contact"){
            state.currentDir = "contact"
            output = "You are now in the contact directory."
          }
          else if (argument === "skills"){
            state.currentDir = "skills"
            output = "You are now in the skills directory."
          }
          else if (argument === "achivements"){
            state.currentDir = "achivements"
            output = "You are now in the achivements directory."
          } 
          else if (argument === "education"){
            state.currentDir = "education"
            output = "You are now in the education directory."
          }
          else if (argument === "hobbies"){
            state.currentDir = "hobbies"
            output = "You are now in the hobbies directory."
          }
           else {
            output = `Directory '${argument}' not found.`
          }
          break;

          case "cat":
            if (state.currentDir === "contact" && argument === "email") {
              output = Object.values(portfolio.contact.email)
            }
            else if(state.currentDir === "contact" && argument === "phone") {
              output = Object.values(portfolio.contact.phone)
            }
            else if(state.currentDir === "contact" && argument === "linkedin") {
              output = Object.values(portfolio.contact.linkedin)
            }
            else if(state.currentDir === "contact" && argument === "github") {
              output = Object.values(portfolio.contact.github)
            }
             else if (state.currentDir === "" && argument === "achievements") {
              output = portfolio.achievements.map((achi) =>achi ).join("\n ,")
            }
            else if (state.currentDir === "" && argument === "hobbies") {
              output = portfolio.hobbies.map((achi) =>achi ).join("\n ,")
            }
            else if (state.currentDir === "projects") {
              const project = portfolio.projects.find(
                (p) => p.name.toLowerCase() === argument.toLowerCase()
              );
              if (project) {
                output = `
                    Name: ${project.name}\n 
                    Description: ${project.description}\n 
                    Link: ${project.link}
                    `
              } else {
                output = `Project '${argument}' not found.`;
              }
            } else {
              output = `Invalid file or directory '${argument}'.`
            }
            break;
        
        case "grep" : 
            if(argument === "name" ){
                output = portfolio.name
            }
            else if (argument === "designation"){
                output = portfolio.designation
            }
            else if(argument === "summary"){
                output = portfolio.summary
            } 
            else if (state.currentDir === ""){
              output = `Sorry ${argument} is not valid in grep. Used Only for name , summary and designation `
            }   
            break
        case "clear" : 
            state.history.length = 0
            return

        case "--help":
          output = `Available commands for my Portfolio : -ls, -cd, -cat, -grep, -help, `
          break

        default:
          output = `Command '${command}' not found. Type '--help' for a list of commands.`
      }
      state.history.push(`$ ${input}`)
      state.history.push(output)
    },
  },
})

export const { Command } = cliSlice.actions
export default cliSlice.reducer
