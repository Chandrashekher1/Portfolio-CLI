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
      const command = args[0]
      const argument = args[1] || ""
      let output = ""

      switch (command) {
        case "ls":
          if (state.currentDir === "projects") {
            output = portfolio.projects.map((project) => project.name).join("\n")
          } else if (state.currentDir === "") {
            output = "mainAbout  aboutMe  projects"
          }else if (state.currentDir === "") {
            output = `\n mainAbout  \n aboutMe \n projects`
            // output = "mainAbout  aboutMe  projects"
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
          }else if (argument === "mainAbout"){
            state.currentDir = "mainAbout"
            output = "You are now in the mainAbout directory."
          }
           else {
            output = `Directory '${argument}' not found.`
          }
          break;

          case "cat":
            if (state.currentDir === "" && argument === "aboutMe") {
              output = portfolio.aboutMe;
            } else if (state.currentDir === "" && argument === "mainAbout") {
              output = portfolio.mainAbout.join("\n")
            } else if (state.currentDir === "projects") {
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
            if(argument === "projects"){
                state.currentDir = "projects"
                output = "You are now in the projects directory."
            }
            else if (argument === "mainAbout"){
                output = portfolio.mainAbout.join("\n")
            }
            else if(argument === "aboutMe"){
                output = portfolio.aboutMe
            }    
            break
        case "clear" : 
            state.history.length = 0
            return

        case "help":
          output = `Available commands for my Portfolio : -ls, -cd, -cat, -grep, -help, `
          break

        default:
          output = `Command '${command}' not recognized. Type 'help' for a list of commands.`
      }
      state.history.push(`$ ${input}`)
      state.history.push(output)
    },
  },
});

export const { Command } = cliSlice.actions
export default cliSlice.reducer
