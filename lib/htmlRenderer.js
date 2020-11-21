const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

//main render function takes in array of objects and returns an html file
const render = employees => {
  const html = [];
  //run render manager on all manager classes
  html.push(...employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );
  //run renderEngineer on all engineer classes
  html.push(...employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  //run renderIntern on all intern classes
  html.push(...employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );
  //html is now an array of templates for each employee
  return renderMain(html.join(""));

};

//function takes in a class and returns a template with the appropriate handlebars replaced
const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

//function takes in an html string and returns a finished html file
const renderMain = html => {
  //get the main template from the directory
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  //replace the {{ team }} pattern with the input html
  return replacePlaceholders(template, "team", html);
};

//function takes in an html template, target, and a replacement value and returns an html string
const replacePlaceholders = (template, placeholder, value) => {
  //set the pattern to be all matches to the {{ word }} pattern
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  //replace all instances of this pattern with a value that your input
  return template.replace(pattern, value);
};

module.exports = render;
