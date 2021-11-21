const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table');
const mysql = require('mysql2');


function introPrompt() {

    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "Please choose one of the following options!",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role"
            ]
        }
    ]).then(function (answer) {
        if (answer.menu === "view all departments") {
            getAllDepartments()
        }
    })
}


function getAllDepartments(){   
    console.log("in function") 
    db.query(
        `SELECT * FROM department`,
        function(err, results, fields) {
            console.log("in function x2")  
            console.log(fields)

    });
}

introPrompt();

