const express = require('express');
const router = express.Router();
const inquirer = require('inquirer')

router.use(require('./employeeRoutes'));

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
      
    })
}

introPrompt();

module.exports = router;