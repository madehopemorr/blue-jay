//code to define and export the Employee class
class Employee {
    
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
//takes in name
    thisName() {
        return this.name;
    }
//takes in id
    thisId() {
        return this.id;
    }
//takes in Email
    thisEmail() {
        return this.email;
    }
//takes in role
    thisRole() {
        return "Employee";
    }

}

module.exports = Employee;