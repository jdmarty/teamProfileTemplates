const validateEmail = val => {
  let valid;
  if (/@\w+.com/.test(val) || val === "") valid = true;
  return valid || "Invalid Email Input";
}

const newEmployee = [
  {
    type: "confirm",
    name: "add",
    message: "Would you like to add a new member to your team?",
  },
];

const employeeRole = [
  {
    type: "list",
    name: "employeeType",
    message: "What type of team member would you like to add?",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

const newManager = [
  {
    type: "input",
    name: "name",
    message: "Manager Name:",
  },
  {
    type: "input",
    name: "id",
    message: "Manager ID:",
  },
  {
    type: "input",
    name: "email",
    message: "Manager Email:",
    validate: validateEmail
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Manager Office Number:",
  },
];

const newEngineer = [
  {
    type: "input",
    name: "name",
    message: "Engineer Name:",
  },
  {
    type: "input",
    name: "id",
    message: "Engineer ID:",
  },
  {
    type: "input",
    name: "email",
    message: "Engineer Email:",
    validate: validateEmail,
  },
  {
    type: "input",
    name: "github",
    message: "Engineer GitHub Username:",
  },
];

const newIntern = [
  {
    type: "input",
    name: "name",
    message: "Intern Name:",
  },
  {
    type: "input",
    name: "id",
    message: "Intern ID:",
  },
  {
    type: "input",
    name: "email",
    message: "Intern Email:",
    validate: validateEmail,
  },
  {
    type: "input",
    name: "school",
    message: "Intern School:",
  },
];

module.exports = {
    newEmployee,
    employeeRole,
    newManager,
    newEngineer,
    newIntern
};
