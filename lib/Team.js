// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
// office number?

const Employee = require('./Employee');

class Team extends Employee {
  constructor(teamName) {
    super();
    this.teamName = teamName;
    
  }
  getTeamName(){
    return this.teamName;
  }
  getRole() {
    return 'Team';
  }
}

module.exports = Team;
