/* WIREFRAME:
    < input team manager + number members:
        - name/email + number members
        - role = 'Manager'
     (loop)
        < member info:
            - name + role=(engineer | interns)
            - intern: school
            - engineer: github username

        
    what building blocks do we need?
    Employee class (name, email, role)
    Manager class (employees, array)
    Intern class (school)
    Engineer class (github)
    
    test creating of each class
    > create Manager Class, check it works.
    > add an employee (Intern): did it increase managers employees?
    > add an employee (engineer): did it increase employees.
    

    use template for read and then writefile
    labelaye khat ha too prompt faza bede!
    
    run the jest tests
    

    * TDD is nice but not necessary for this.
    */

const inquirer = require( 'inquirer' );
const util = require( "util" );
const fs = require( 'fs' );
const writeFileAsync = util.promisify(fs.writeFile);

const { Manager, Engineer, Intern } = require("./lib/Staff");
// In case of name collisions, we can rename them like this:
// const { Manager : OtherManager, Engineer : OtherEngineer, Intern : OtherIntern, } = require("./lib/myclass");




async function main(){

    const managerData = await inquirer.prompt([
        { name: 'managername', type: 'input', message: `What is the manager's name?` },
        { name: 'manageremail', type: 'input', message: `What is the manager's email?` },
        { name: 'managerofficenumber', type: 'input', message: `What is the manager's office number?` },
        { name: 'count', type: 'input', message: 'How many people work under him/her?' }
    ]);

    // create manager object
    let manager = new Manager( managerData.managername, managerData.manageremail, managerData.managerofficenumber );

    console.log(`new employee is a ${manager.role} with ID: ${manager.id} | name: ${manager.name} | email: ${manager.email} | office: ${manager.officeNumber} | employees: ${manager.employees} `);
    
    let userData;
    let employee;
    for( let userCnt=1; userCnt <= managerData.count; userCnt++ ){
        // start asking role (engniner / intern) as well as general questions common between engineer and intern
        // validate for required values like name and format like email
        userData = await inquirer.prompt([
            { name: 'name', type: 'input', message: `What is the name?` },
            { name: 'useremail', type: 'input', message: `What is the email?` },
            { name: 'userrole', type: 'list', message: `What is the role?`, choices: ["Engineer", "Intern"], 'default': 'Engineer' },
            { name: 'github', type: 'input', message: `What is the github?`, 'when': (userData) => userData.userrole === 'Engineer'},
            { name: 'school', type: 'input', message: `What is the School?`, 'when': (userData) => userData.userrole === 'Intern' }
        ]);

        if (userData.userrole==="Engineer"){
            // create Engineer object
            employee = new Engineer( userData.name, userData.email, userData.github );

        }
        else {
            // create Engineer object
            employee = new Intern( userData.name, userData.email, userData.school );

        }

        // add it to manager object
        manager.employees.push( employee );

    }

    // now generate html and write file
    // let team = '';
    // team += readCard( manager );
    // manager.getUsers().forEach( function( user ){
    //     team += readCard( user );
    // });
    // const html = readCard( { role: 'main', team: team } );
    const html = `
        <div class="card">
          <div class="card-header">
            <h4>${manager.role}</h4>
          </div>
          <div class="card-body">
            <ul id="tableList" class="list-group">
                <li class="list-group-item mt-4">
                    <h2>${manager.name}</h2><hr>
                    <h2>ID: ${manager.id}</h2>
                    <h2>Name: ${manager.name}</h2>
                    <h2>Email: ${manager.email}</h2>
                    <h2>Phone: ${manager.officeNumber}</h2>
                </li>
            </ul>
          </div>
        </div>
    
    `;
    //fs.writeFileSync( 'org.html', html );

    try{
        await writeFileAsync( "index.html", html );
        console.log("Successfully wrote to 'index' file");
    } catch (err) {
        console.log(err);
    }


    // console.clear();

    newEmployee = manager; //new Manager('majid', 'majid@test.com', 1);
    console.log("\n\n");
    console.log(`new employee is a ${newEmployee.role} with ID: ${newEmployee.id} | name: ${newEmployee.name} | email: ${newEmployee.email} | office: ${newEmployee.officeNumber} | \n employees: ${JSON.stringify(newEmployee.employees)} `);

    // newEmployee1 = new Engineer('ali', 'ali@test.com', 'github username');
    // newEmployee.employees.push(newEmployee1);
    // console.log(`new employee is a ${newEmployee1.role} with ID: ${newEmployee1.id} | name: ${newEmployee1.name} | email: ${newEmployee1.email} | github: ${newEmployee1.github} `);

    // newEmployee2 = new Intern('mehdi', 'mehdi@test.com', 'school name');
    // newEmployee.employees.push(newEmployee2);
    // console.log(`new employee is a ${newEmployee2.role} with ID: ${newEmployee2.id} | name: ${newEmployee2.name} | email: ${newEmployee2.email} | school: ${newEmployee2.school} `);

    // console.log("\n\n");
    // console.log(`new employee is a ${newEmployee.role} with ID: ${newEmployee.id} | name: ${newEmployee.name} | email: ${newEmployee.email} | office: ${newEmployee.officeNumber} | \n employees: ${JSON.stringify(newEmployee.employees)} `);


}

main();

// function validateFunc(input){
// 	if (input=="Engineer") { 
//         return true;
// 	}
// 	else { // if input=="Intern"
// 		return false;
// 	}
// }