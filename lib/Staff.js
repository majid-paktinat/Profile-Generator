
let ID = 1; // global employee ID (increases with each new employee created)

// make classes into separate package!
class Employee {
     constructor ( name, id, email, role='Employee' ){
         this.id = id; // increase each employee creation.
         this.name = name;
         this.email = email;
         this.role = role;
         ID++;
     }
     getName(){return this.name}
     getId(){return this.id}
     getEmail(){return this.email}
     getRole(){return this.role}
     
 }

 class Manager extends Employee {
    constructor( name, email, officeNumber ){
        super( ID, name, email, 'Manager' );
        this.officeNumber = officeNumber;
        this.employees = [];
    }
    // ....
}

class Engineer extends Employee {
    constructor( ID, name, email, github ){
        super( name, email, 'Engineer' );
        this.github = github;
    }
}

class Intern extends Employee {
    constructor( name, email, school ){
        super( name, email, 'Intern' );
        this.school = school;
    }
}

module.exports = {
    Employee,
    Manager,
    Engineer,
    Intern
};