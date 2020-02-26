
let ID = 1; // global employee ID (increases with each new employee created)

// make classes into separate package!
class Employee {
     constructor ( name, id=ID, email, role='Employee' ){
         this.id = id; 
         this.name = name;
         this.email = email;
         this.role = role;
         ID++; // increase each employee creation.
     }
     getName(){return this.name}
     getId(){return this.id}
     getEmail(){return this.email}
     getRole(){return this.role}
     
 }

 class Manager extends Employee {
    constructor( name, id, email, officeNumber ){
        super( ID, name, email, 'Manager' );
        this.role = 'Manager';
        this.officeNumber = officeNumber;
        this.employees = [];
    }
    getRole(){return this.role}
    getOfficeNumber(){return this.officeNumber}

}

class Engineer extends Employee {
    constructor( name, id, email, github ){
        super( name, email, 'Engineer' );
        this.role='Engineer';
        this.github = github;
    }
    getRole(){return this.role}
    getGithub(){return this.github}

}

class Intern extends Employee {
    constructor( name, id, email, school ){
        super( name, email, 'Intern' );
        this.role='Intern';
        this.school = school;
    }
    getRole(){return this.role}
    getSchool(){return this.school}

}

module.exports = {
    Employee,
    Manager,
    Engineer,
    Intern
};