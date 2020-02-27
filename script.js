/* 
    font awsome <i class="fas fa-user-graduate"></i>
    read from templates and then writefile
    Try and catch !

*/

const inquirer = require( 'inquirer' );
const util = require( "util" );
const fs = require( 'fs' );
const writeFileAsync = util.promisify(fs.writeFile);

const { Manager, Engineer, Intern } = require("./lib/staff");
vUtil = require("./lib/validateUtil");


async function main(){
    console.clear();
    const managerData = await inquirer.prompt([
        { name: 'managername', type: 'input', message: `What is the manager's name?\n`, validate: vUtil.validateRequired },
        { name: 'manageremail', type: 'input', message: `What is the manager's email?\n` , validate: vUtil.validateRequired},
        { name: 'managerofficenumber', type: 'input', message: `What is the manager's office number?\n` , validate: vUtil.validateNumber},
        { name: 'count', type: 'input', message: 'How many people work under him/her?\n' , validate: vUtil.validateCount}
    ]);

    // create manager object
    let manager = new Manager( managerData.managername, managerData.fakeID, managerData.manageremail, managerData.managerofficenumber );

    //console.log(`new employee is a ${manager.role} with ID: ${manager.id} | name: ${manager.name} | email: ${manager.email} | office: ${manager.officeNumber} | employees: ${manager.employees} `);
    
    let userData;
    let employee;
    for( let userCnt=1; userCnt <= managerData.count; userCnt++ ){
        userData = await inquirer.prompt([
            { name: 'name', type: 'input', message: `What is the name?\n`, validate: vUtil.validateRequired },
            { name: 'useremail', type: 'input', message: `What is the email?\n`, validate: vUtil.validateRequired },
            { name: 'userrole', type: 'list', message: `What is the role?\n`, choices: ["Engineer", "Intern"], 'default': 'Engineer' },
            { name: 'github', type: 'input', message: `What is the github?\n`, 'when': (userData) => userData.userrole === 'Engineer', validate: vUtil.validateRequired },
            { name: 'school', type: 'input', message: `What is the School?\n`, 'when': (userData) => userData.userrole === 'Intern', validate: vUtil.validateRequired }
        ]);

        if (userData.userrole==="Engineer"){
            // create Engineer object
            employee = new Engineer( userData.name, userData.fakeID, userData.useremail, userData.github );
            //console.log(`new employee is a ${employee.role} with ID: ${employee.id} | name: ${employee.name} | email: ${employee.email} | git: ${employee.github} `);

        }
        else {
            // create Intern object
            employee = new Intern( userData.name, userData.fakeID, userData.useremail, userData.school );
            //console.log(`new employee is a ${employee.role} with ID: ${employee.id} | name: ${employee.name} | email: ${employee.email} | school: ${employee.school} `);

        }

        // add it to manager object
        manager.employees.push( employee );

    }

    var html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        
        <title>Document</title>
        </head>


        <body>
        
        <div class="row"><div class="col-12" style="background-color: #E54A58; color: white; padding-top:35px; padding-bottom:35px; text-align:center"><h2>My Team<h2></div></div>
        <br>
        <div class="container" style="border: solid 0px;">
        
        <div class="row">

        <div class="col-4 card" style="border: solid 0px; border-color: gray; width: 18rem; ">
            <div class="card-header" style="background-color: #147BF2; color: white;">
                <h4>${manager.name}</h4>
                <h4>${manager.role}</h4>
                </div>
                <div class="card-body" style="background-color: #F2FAF1;">
                <ul class="list-group list-group-flush" style="border: solid 0px; border-color: gray;">
                <li class="list-group-item"><b>ID:</b> ${manager.id}</li>
                <li class="list-group-item"><b>Email:</b> ${manager.email}</li>
                <li class="list-group-item"><b>Office Number:</b> ${manager.officeNumber}</li>
                </ul>
            </div>
        </div>
    `;

    for ( let X=0; X < manager.employees.length; X++ ){
        if ( manager.employees[X].role == 'Engineer' ){
            html = html + `
            <div class="col-4 card" style="border: solid 0px; border-color: gray; width: 18rem; ">
                <div class="card-header" style="background-color: #147BF2; color: white;">
                    <h4>${manager.employees[X].name}</h4>
                    <h4>${manager.employees[X].role}</h4>
                </div>
                <div class="card-body" style="background-color: #F2FAF1;">
                <ul class="list-group list-group-flush" style="border: solid 0px; border-color: gray;">
                    <li class="list-group-item"><b>ID:</b> ${manager.employees[X].id}</li>
                    <li class="list-group-item"><b>Email:</b> ${manager.employees[X].email}</li>
                    <li class="list-group-item"><b>GitHub:</b> ${manager.employees[X].github}</li>
                </ul>
                </div>
            </div>
            `
        } else if ( manager.employees[X].role == 'Intern' ){
            html = html + `
            <div class="col-4 card" style="border: solid 0px; border-color: gray; width: 18rem; ">
                <div class="card-header" style="background-color: #147BF2; color: white;">
                    <h4>${manager.employees[X].name}</h4>
                    <h4>${manager.employees[X].role}</h4>
                </div>
                <div class="card-body" style="background-color: #F2FAF1;">
                <ul class="list-group list-group-flush" style="border: solid 0px; border-color: gray;">
                    <li class="list-group-item"><b>ID:</b> ${manager.employees[X].id}</li>
                    <li class="list-group-item"><b>Email:</b> ${manager.employees[X].email}</li>
                    <li class="list-group-item"><b>GitHub:</b> ${manager.employees[X].school}</li>
                </ul>
                </div>
            </div>
            `
        }
    }
    html = html + "</div></body></html>"

    try{
        await writeFileAsync( "Team.html", html );
        console.log("Successfully wrote to file!");
    } catch (err) {
        console.log(err);
    }
}



main();
