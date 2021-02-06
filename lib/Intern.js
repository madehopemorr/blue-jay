// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    thisRole() {
        return "Intern";
    }
//only specific to intern
    thisSchool() {
        return this.school;
    }

}

module.exports = Intern;