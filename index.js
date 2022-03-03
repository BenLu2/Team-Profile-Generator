const generateHtml = require('./classes/generateHtml')
const inquirer = require('inquirer')
const fs = require('fs')
const Employee = require('./classes/employee')
const Engineer = require('./classes/engineer')
const Intern = require('./classes/intern')
const Manager = require('./classes/manager')
const path = require('path'); 
const { template } = require('lodash')
// console.log(generateHtml(team))

const team = [];

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
            name: "id",
            type: 'input',
            message: "What is this manager's id?"
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
})
}

const addEmployee = () => {
    return inquirer.prompt(
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
        const employee = new Employee (name, id, email);

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        team.push(employee); 

        if (addAnother) {
            return addEmployee(team); 
        } else {
            return team;
        }
    })
};

// generate HTML page file
const writeFile = data => {
    fs.writeFile('./', data, err => {
        if (err) {
            console.log(err);
            return; 
        } else {
            console.log("Team profile has been successfully created!")
        }
    })
}; 

addManager()
  .then(addEmployee)
  .then(team => {
    return generateHTML(team);
  })
  .then(HTMLpage => {
    return writeFile(HTMLpage);
  })
  .catch(err => {
 console.log(err);
  });

console.log(generateHtml(team))