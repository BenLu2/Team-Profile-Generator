class Employee {
    constructor(id, name, email)
    {
        this.id = id
        this.name = name
        this.email = email
    }
    getName() {
        console.log(`Name: ${this.name}`)
        return this.name
    }
    getId() {
        console.log(`Name: ${this.id}`)
        return this.id
    }
    getEmail() {
        console.log(`Name: ${this.email}`)
        return this.email
    }
    getRole() {
        return 'Employee'
    }
}

module.exports = Employee