const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {
  function createManager() {
    console.log("Please build your team");
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is your Name?",
        },
        {
          type: "input",
          name: "email",
          message: "What is your Email?",
        },
        {
          type: "input",
          name: "ID",
          message: "What is your Employee ID?",
        },
        {
          type: "input",
          name: "office",
          message: "What is your office number?",
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.name,
          answers.ID,
          answers.email,
          answers.office
        );
        teamMembers.push(manager);
        idArray.push(answers.ID);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is your Engineer's Name?",
        },
        {
          type: "input",
          name: "email",
          message: "What is your Engineer's Email?",
        },
        {
          type: "input",
          name: "id",
          message: "What is your Engineer's Employee ID?",
        },
        {
          type: "input",
          name: "gitHub",
          message: "What is your Engineer's GitHub username?",
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.name,
          answers.email,
          answers.id,
          answers.gitHub
        );
        teamMembers.push(engineer);
        idArray.push(answers.id);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is your Intern's Name?",
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your Intern's Email?",
        },
        {
          type: "input",
          name: "internID",
          message: "What is your Intern's Employee ID?",
        },
        {
          type: "input",
          name: "school",
          message: "What school does your Intern attend",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.name,
          answers.email,
          answers.id,
          answers.school
        );
        teamMembers.push(intern);
        idArray.push(answers.internID);
        createTeam();
      });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }
  createManager();
}

appMenu();
