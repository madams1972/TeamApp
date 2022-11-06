const Team = require("./lib/Team");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { resolve } = require("path");
const { finished } = require("stream");
const { resolveSoa } = require("dns");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];
// Initialize the application
function init() {
    // Prompt user for input response and team name
    inquirer.prompt([
        {
            type: 'input',
            name: 'teamName',
            message: 'Enter your team name:',
        }
    ]).then((res) => {
        // Assign variable to the user's response object
        const team = new Team(res.teamName);
        // push the team name to the employees array
        employees.push(team);
        // console.log(employees);
        newManager();
    });
}

// ask for manager input
function newManager() {
    inquirer.prompt([
        // MANAGER
        {
            type: 'input',
            name: 'name',
            message: "What's the Manager's name:",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter Manager's ID:",
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter Manager's email:",
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Enter Manager's office number:",
        }
    ]).then((res) => {
        // create a new manager object
        const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
        // push the manager object to the employees array
        employees.push(manager);
        // console.log(employees);
        newMember();
    });
}
// ask for engineer input
function newEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter the Engineer's name:",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter Engineer's ID:",
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter Engineer's email:",
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter Engineer's GitHub username:",
        }
    ]).then((res) => {
        // create a new engineer object
        const engineer = new Engineer(res.name, res.id, res.email, res.github);
        // push the engineer object to the employees array
        employees.push(engineer);
        // console.log(employees);
        newMember();
    });
}

// ask for intern input
function newIntern() {
    inquirer.prompt([  
        {
            type: 'input',
            name: 'name',
            message: "Enter the Intern's name:",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the Intern's ID:",
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter the Intern's email:",
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter the Intern's school:",
        }
    ]).then((res) => {
        // create new intern object
        const intern = new Intern(res.name, res.id, res.email, res.school);
        // push intern object to employees array
        employees.push(intern);
        // console.log(employees);
        newMember();
    });
}

// ask for new member
function newMember() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'newMember',
            message: 'Add a new team member:',
            choices: ['Engineer', 'Intern', new inquirer.Separator(), 'Render'],
        }
    ]).then((res) => {
        // if selection is engineer, ask for new engineer input        
        if (res.newMember === 'Engineer') {
            newEngineer();
        } 
        // if selection is intern, ask for new intern input
        else if (res.newMember === 'Intern') {
            newIntern();
        }
        // if answer is 'render', call renderTeam function
        else {
            renderTeam();
        }    
    });
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function renderTeam() {
    // declare a variable containing the rendered output from employees data
    const data = render(employees);
    // write the data to the file team.html
    fs.writeFile(outputPath, data, (err) =>
    err ? console.log(err) : console.log('Successfully created team!'));
}

// Call intializer function
init();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
