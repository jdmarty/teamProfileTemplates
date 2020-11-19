//npm dependencies
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");

//Components
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');

//HTML renderer
const render = require('./lib/htmlRenderer');
const { create } = require("domain");

//base questions
const newEmployee = [
    {
        type: "confirm",
        name: "newEmployee",
        message: "Would you like to add a new employee to your team?",
    }
];

const employeeType = [
    {
        type: 'list',
        name: 'employeeType',
        message: 'What type of employee would you like to add?',
        choices: ['Manager', 'Engineer', 'Intern']
    }
]

const newManager = [
    {
        type: 'input',
        name: 'name',
        message: 'Manager Name:',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Manager ID:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Manager Email:'
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Manager Office Number:'
    }
]

const newEngineer = [
    {
        type: 'input',
        name: 'name',
        message: 'Engineer Name:',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Engineer ID:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Engineer Email:'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Engineer GitHub Username:'
    }
]

const newIntern = [
    {
        type: 'input',
        name: 'name',
        message: 'Intern Name:',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Intern ID:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Intern Email:'
    },
    {
        type: 'input',
        name: 'school',
        message: 'Intern School:'
    }
]



//Function to ask if the user wants to add a new employee
function askNewEmployee() {
    return inquirer.prompt(newEmployee)
}

//Function to ask for the type of employee
function askEmployeeType() {
    return inquirer.prompt(employeeType)
}

async function createEmployee() {
    const { employeeType } = await askEmployeeType()
    switch (employeeType) {
        case 'Manager':
            const { name: nameMan, id: idMan, email: emailMan, officeNumber } = await inquirer.prompt(newManager)
            return new Manager(nameMan, idMan, emailMan, officeNumber);
        case 'Engineer':
            const { name: nameEng, id: idEng, email: emailEng, github } = await inquirer.prompt(newEngineer)
            return new Engineer(nameEng, idEng, emailEng, github);
        case('Intern'):
            const { name: nameInt, id: idInt, email: emailInt, school } = await inquirer.prompt(newIntern)
            return new Intern(nameInt, idInt, emailInt, school);
    }
}

async function createEmployeesArray(current = []) {
    
}







const outputsDir = path.resolve(__dirname, "./output")

// const manager1 = new Manager("Josh", 1, "joshu", 100);
// const manager2 = new Manager("Jeff", 2, "jeffu", 101);
// const managers = [manager1, manager2];

// const data = render(managers)

// fs.writeFile(path.resolve(outputsDir, 'team.html'), data, err => {
//     if (err) throw err;
//     console.log('Team HTML generated')
// })