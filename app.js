const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//creates an output directory that will be used in the buildTeam function to sync & make the output path for directory.
const OUTPUT_DIR = path.resolve(__dirname, "output");

//this path joins the output directory with the team.html
const outputPath = path.join(OUTPUT_DIR, "team.html");

//requires the htmlRenderer.js 
const render = require("./lib/htmlRenderer");


//variable that takes in the array of team members
const myTeam = [];

//variable that takes in array of team member's ids.
const memberId = [];

//function that runs app
function mainMenu() {

//function with manager object that uses inquirer prompts to allow user to input answers of managers name, id, email, and office number.
    function myManager() {
        console.log("Build your team");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at lease one character.";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive numer greater than zero.";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";
                }
            }
        //takes the inputted answers and pushes/assigns the new team members and their new id to the created manager.
        ]).then(answers => {
            //this manager varialbe takes in the inputted answers for new manager and assigns them to the variable (name, id, email..)
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            //takes new team member and assigns them to manager
            myTeam.push(manager);
            //takes in managers id 
            memberId.push(answers.managerId);
            //calls makeTeam function and starts inquirer prompts
            makeTeam();
        });
    }
    //function that allows user to add specific team members and assign their details
    function makeTeam() {

        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            }
        //brings up prompt that allows user to then choose if they want to add a team member of any of the specified positions
        ]).then(userInput => {
            switch(userInput.memberChoice) {
                //gives user the choice to add employees under different roles
            case "Engineer":
                newEngineer();
                break;
            case "Intern":
                newIntern();
                break;
            default:
                buildTeam();
            }
        });
    }
    //function that runs prompts to add a new engineer to team along with assigning their newly inputted details
    function newEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (memberId.includes(answer)) {
                            return "This ID is already taken. Please enter a different number.";
                        } else {
                            return true;
                        }

                    }
                    return "Please enter a positive number greater than zero.";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's GitHub username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            }
        //pushes newly inputted answers to the newly created engineer.
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            myTeam.push(engineer);
            memberId.push(answers.engineerId);
            //updating the team
            makeTeam();
        });
    }
//function running prompts to create new intern & intern's details
    function newIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    //doesnt allow user to enter a blank when asked for name
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        //doesnt allow two team members to have same id
                        if (memberId.includes(answer)) {
                            return "This ID is already taken. Please enter a different number.";
                        } else {
                            return true;
                        }

                    }
                    return "Please enter a positive number greater than zero.";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern's school?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            }
        //takes user answers and pushes them to newly created intern team member along with their name, id, etc.
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            myTeam.push(intern);
            memberId.push(answers.internId);
            makeTeam();
        });
    }
//function that renders myTeam object and uses fs to sync & make directory for output. 
    function buildTeam() {
        //output needs to be created
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(myTeam), "utf-8");
    }
    //asks who is the manager first before allowing user to add more positions
    myManager();

}
//takes user back to the main menu after each new update
mainMenu();
