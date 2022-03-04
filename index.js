const generateHtml = require('./classes/generateHtml')
const inquirer = require('inquirer')
const fs = require('fs')
const Employee = require('./classes/employee')
const Engineer = require('./classes/engineer')
const Intern = require('./classes/intern')
const Manager = require('./classes/manager')
const path = require('path'); 
// const { template } = require('lodash')
// console.log(generateHtml(team))

const team = [];

function initApp() {
    startHtml();
    addManager();
}

const addManager = () => {

 inquirer.prompt(
    [
        {
            type: 'input',
            message: "What is the manager name?",
            name: "name"
           
            // validate: (response) => {
            //     if (!response) {
            //         return console.log('manager name is required.')
            //     } else {
            //         return true
            //     }
            // }
        },
        
        {
            type: 'input',
            message: "What is this manager's ID?",
            name: 'id'
            // validate: (response) => {
            //     if (!response) {
            //         return console.log('manager id is required.')
            //     } else {
            //         return true
            //     }
            // }

        },
        {
            name: "email",
            type: 'input',
            message: "What is the manager's email?",
            // validate: (response) => {
            //     if (!response) {
            //         return console.log('manager email is required.')
            //     } else {
            //         return true
            //     }

            // },
        },
        {
            name: "officeNumber",
            type: 'input',
            message: "What is manager's office number?",
            // validate: (response) => {
            //     if (!response) {
            //         return console.log('office number is required.')
            //     } else {
            //         return true
            //     }

            // },

        },
        {
            type: 'list',
            message: 'What type of member would you like to add?',
            name: 'addAnother',
            choices: ['Engineer', 'Intern']
        }
    ]
).then(managerInput => {
    const manager = new Manager(managerInput.name, managerInput.id, managerInput.email, managerInput.officeNumber)
    team.push(manager)
    console.log(team)

    switch (managerInput.addAnother) {
        case 'Engineer':
            addEmployee();
            break;
        case 'Intern':
            addEmployee();
            break;
        default:
            generateHtml(team); 
            break; 
    }
}).catch((error) => {
    console.log(' error', error);
  });
}

const addEmployee = () => {
     inquirer.prompt(
        [
            {
                name: "name",
                type: 'input',
                message: "What is the new employee's name?",
                validate: (response) => {
                    if (!response) {
                        return console.log('office number is required.')
                    } else {
                        return true
                    }
    
                },
    
            },
            {
                name: 'role',
                type: 'list',
                message: "Please choose your employee's role",
                choices: ['Engineer', 'Intern']
    
            },
            {
                name: "id",
                type: 'input',
                message: "What is the new employee's id?",
                validate: (response) => {
                    if (!response) {
                        return console.log('office number is required.')
                    } else {
                        return true
                    }
    
                },
    
            },
            {
                name: "email",
                type: 'input',
                message: "What is new employee's email?",
                validate: (response) => {
                    if (!response) {
                        return console.log('email is required.')
                    } else {
                        return true
                    }
    
                },
    
            },

            {
                name: "github",
                type: 'input',
                message: "What is new employee's github?",
                validate: (response) => {
                    if (!response) {
                        return console.log('github input is required.')
                    } else {
                        return true
                    }
    
                },
    
            },

            {
                name: "school",
                type: 'input',
                message: "What is new intern's school?",
                validate: (response) => {
                    if (!response) {
                        return console.log('school is required.')
                    } else {
                        return true
                    }
    
                },
    
            },
            {
                type: 'confirm',
                name: 'addAnother',
                message: 'Would you like to add another team members?',
                default: false
            }
        ]
    ).then(employeeQ => {
        let { name, id, email, role, github, school, addAnother } = employeeQ; 
        let employee;

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        team.push(employee); 
        addHtml(employee)

        if (addAnother) {
            return addEmployee(team); 
        } else {
            
            finishHtml(team);
        }
    })
};

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./classes/test.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}
function addHtml(employee) {
    return new Promise(function(resolve, reject) {
        const name = employee.getName();
        const role = employee.getRole();
        const id = employee.getId();
        const email = employee.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = employee.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = employee.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const officePhone = employee.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("adding team employee");
        fs.appendFile("./classes/test.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./classes/test.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}


initApp();
