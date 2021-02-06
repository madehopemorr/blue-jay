// The engineer class inherits from the Employee class except for thisRole and thisGithub.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
//gets the engineer role
    thisRole() {
        return "Engineer";
    }
//gets the engineer's github 
    thisGithub() {
        return this.github;
    }

}

module.exports = Engineer;