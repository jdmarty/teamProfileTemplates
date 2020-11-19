const path = require("path");
const fs = require("fs");

const Manager = require('./lib/Manager')
const render = require('./lib/htmlRenderer')

const manager1 = new Manager('Josh', 1, 'joshu', 100);
const manager2 = new Manager('Jeff', 2, 'jeffu', 101)
const managers = [manager1, manager2]

const outputsDir = path.resolve(__dirname, "./output")
const data = render(managers)

fs.writeFile(path.resolve(outputsDir, 'team.html'), data, err => {
    if (err) throw err;
    console.log('Team HTML generated')
})