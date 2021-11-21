const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table');
const mysql = require('mysql2');
const fs = require('fs')

const seedQuery = fs.readFileSync("db/seed.sql", {
    encoding: "utf-8"
})

db.connect()

db.query(seedQuery, err => {
    if (err) {
        throw err
    }

    console.log("db seeded")
})

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
        console.log("outside if statement")
        if (answer.menu === "view all departments") {
            console.log("in if statement")
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

