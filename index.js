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
                "add an employees",
                "update an employee role"
            ]
        }
    ]).then(function (answer) {
        if (answer.menu === "view all departments") {
            getAllDepartments()
        } else if (answer.menu === "view all roles") {
            getAllRoles()
        } else if (answer.menu === "view all employees") {
            getAllEmployees()
        } else if (answer.menu === "add a department") {
            addDepartment()
        }
    })
}


function getAllDepartments() {
    console.log("in function")
    db.query(
        `SELECT * FROM department`,
        function (err, results) {
            console.table(results)
        });
}

function addDepartment() {
    inquirer.prompt(
        {
            type: "input",
            name: "name",
            message: "What department would you like to add?",
        }
    ).then(function (answer) {
        console.log(answer.name)
        db.query(
            `INSERT INTO department (name) VALUES (${answer.name})`, function (err, result) {
                if (err) {
                    throw err
                } else{
                console.log("1 record inserted");
                getAllDepartments();
                }
              });
    });
};

function getAllRoles() {
    db.query(
        `SELECT * FROM roles`,
        function (err, results) {
            console.table(results)
        });
}

function getAllEmployees() {
    db.query(
        `SELECT * FROM employee`,
        function (err, results) {
            console.table(results)
        });
}

introPrompt();

