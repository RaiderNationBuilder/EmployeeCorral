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
        } else if (answer.menu === "add a role") {
            addRole()
        } else if (answer.menu === "add an employees") {
            addEmployee()
        } else if (answer.menu === "update an employee role") {
            updateEmployeeRole()
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
};

function addDepartment() {
    inquirer.prompt(
        {
            type: "input",
            name: "name",
            message: "What department would you like to add?",
        }
    ).then(function (answer) {
        console.log(answer.name)
        db.query(`INSERT INTO department (name) VALUES (?);`,
            [answer.name],
            function (err, result) {
                if (err) {
                    throw err
                } else {
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
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Whats the title of the role you would like to add?",
        },
        {
            type: "input",
            name: "salary",
            message: "Whats the salary of the role you would like to add?",
        },
        {
            type: "input",
            name: "departmentId",
            message: "Whats the department id of the role you would like to add?",
        }
    ]).then(function (answer) {
        if (answer) {
            console.log(answer)
            db.query(
                `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`,
                [answer.title, answer.salary, answer.departmentId],
                function (err, results) {
                    getAllRoles();
                });
        }
    });
};

function getAllEmployees() {
    db.query(
        `SELECT * FROM employee`,
        function (err, results) {
            console.table(results)
        });
};

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Whats the First Name of the employee you would like to add?",
        },
        {
            type: "input",
            name: "lastName",
            message: "Whats the Last Name of the employee you would like to add?",
        },
        {
            type: "input",
            name: "roleId",
            message: "Whats the role of the employee you would like to add?",
        },
        {
            type: "input",
            name: "managerId",
            message: "Does the new employee have a manager you would like to add?",
        }
    ]).then(function (answer) {
        if (answer) {
            console.log(answer)
            db.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,
                [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
                function (err, results) {
                    getAllEmployees();
                });
        }
    });
};

function updateEmployeeRole() {
    getAllEmployees();

    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Whats the First Name of the employee you would like to update?",
        },
        {
            type: "input",
            name: "lastName",
            message: "Whats the Last Name of the employee you would like to update?",
        },
        {
            type: "input",
            name: "role",
            message: "Whats the new role of the employee you would like to update?",
        }
    ]).then(function (answer) {
        db.query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?;`,
            [answer.firstName, answer.lastName],
            function (err, results) {
                var roleId = results[0].id
                if (roleId) {
                    db.query(
                        `UPDATE employee SET role_id = ?
                        WHERE id = ?`,
                        [roleId, answer.role],
                        function (err, results) {
                            if (!err) {
                            console.log('in update callback', results)
                            getAllEmployees();
                            } else {
                                console.log('somthing is fishy')
                            }
                        });
                }
            });

    });

    if (err) throw err;
    var sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
};

introPrompt();

