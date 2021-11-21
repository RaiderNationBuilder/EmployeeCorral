const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table');
const mysql = require('mysql2');
const fs = require('fs')

const seedQuery = fs.readFileSync("db/seed.sql", {
    encoding: "utf-8"
})

db.connect(function (err) {
    if (err) console.log("error connecting: ", err);
});

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
        } else if (answer.menu === "view all roles") {
            getAllRoles()
        }
    })
}


function getAllDepartments() {
    console.log("in function")
    db.query(
        `SELECT * FROM department`,
        function (err, results) {
            console.log("in function x2")
            console.log("results", results)
            console.table(results)
        });
}

function getAllRoles() {
    db.query(
        `SELECT * FROM roles`,
        function (err, results) {
            console.log("in function x2")
            console.log("results", results)
            console.table(results)
        });
}

introPrompt();

