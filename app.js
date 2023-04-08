const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db');

async function main() {
  let exit = false;

  while (!exit) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ]);

    switch (action) {
      case 'View all departments':
    }
  }
  process.exit();
}

main();
