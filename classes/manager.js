const Employee = require('./employee')

class Manager extends Employee {
    constructor(name, id, email, office) {
        //use super to access parent employee class for name id and email
        super(name, id, email)
        this.name = name
        this.id = id
        this.email = email
        this.office = office
    }
    getRole() {
        return 'Manager'
    }
    getOffice() {
        return this.office
    }
}

module.exports = Manager