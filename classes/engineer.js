const Employee = require('./employee')

// extends engineer class from employee class
class Engineer extends Employee {
    constructor(name, id, email, github) {
        //use super to access from the parent (employee class)
        super(name, id, email)
        this.name = name
        this.id = id
        this.email = email
        this.github = github
    }
    getRole() {
        return 'Engineer'
    }
    getGithub() {
        return this.github
    }
}

module.exports = Engineer