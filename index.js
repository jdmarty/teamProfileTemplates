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
const { newEmployee, employeeType, newManager, newEngineer, newIntern } = require('./lib/prompts')

//Function to ask if the user wants to add a new employee
function askNewEmployee() {
    return inquirer.prompt(newEmployee)
}

//Function to ask for the type of employee
function askEmployeeType() {
    return inquirer.prompt(employeeType)
}

//Function to create an employee from desired type
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

//Function to create employees as long as requested
async function createEmployeesArray(employees = []) {
    const wantNew = await askNewEmployee();
    if (!wantNew.add) return employees;
    employees.push(await createEmployee());
    logEmployees(employees)
    return createEmployeesArray(employees);
}

//Function to log employees
function logEmployees(employees) {
    console.log("-".repeat(60));
    console.log('Your Team');
    console.log('-'.repeat(60))
    employees.forEach(em => {
        console.log(
          `${em.getName()} | ${em.getRole()} | ID: ${em.getId()}`
        );
    })
    console.log("-".repeat(60));
}

//set directory path to write teams file
const outputsDir = path.resolve(__dirname, "./output");

//function to write html from an array of employee objects
async function writeTeamsPage() {
    const employees = await createEmployeesArray()
    const teamsHTML = render(employees);
    fs.writeFile(path.resolve(outputsDir, "team.html"), teamsHTML, (err) => {
      if (err) throw err;
      console.log("Teams Page Generated!");
    });
}

writeTeamsPage()