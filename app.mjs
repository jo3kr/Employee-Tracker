import inquirer from 'inquirer';
import db from './config/connection.mjs';

async function main() {
  let exit = false;

  while (!exit) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ]);

    switch (action) {
      // View all departments
      case "View all departments":
        const departments = await db.query("SELECT * FROM department");
        console.table(departments);
        break;

      // View all roles
      case "View all roles":
        const roles = await db.query("SELECT * FROM role");
        console.table(roles);
        break;

      // View all employees
      case "View all employees":
        const employees = await db.query("SELECT * FROM employee");
        console.table(employees);
        break;

      // Add a department
      case "Add a department":
        const { departmentName } = await inquirer.prompt([
          {
            type: "input",
            name: "departmentName",
            message: "Enter the department name:",
            validate: (input) =>
              input ? true : "Department name cannot be empty",
          },
        ]);

        await db.query("INSERT INTO department (name) VALUES (?)", [
          departmentName,
        ]);
        console.log("Department added successfully!");
        break;

      // Add a role
      case "Add a role":
        const departmentsChoices = await db.query("SELECT * FROM department");
        const { roleName, roleSalary, roleDepartment } = await inquirer.prompt([
          {
            type: "input",
            name: "roleName",
            message: "Enter the role name:",
            validate: (input) => (input ? true : "Role name cannot be empty"),
          },
          {
            type: "number",
            name: "roleSalary",
            message: "Enter the role salary:",
            validate: (input) =>
              !isNaN(input) ? true : "Salary must be a number",
          },
          {
            type: "list",
            name: "roleDepartment",
            message: "Select the department for this role:",
            choices: departmentsChoices.map((department) => ({
              name: department.name,
              value: department.id,
            })),
          },
        ]);

        await db.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [roleName, roleSalary, roleDepartment]
        );
        console.log("Role added successfully!");
        break;

      // Add an employee
      case "Add an employee":
        const roleChoices = await db.query("SELECT * FROM role");
        const employeeChoices = await db.query("SELECT * FROM employee");
        employeeChoices.push({ id: null, first_name: "None", last_name: "" });

        const { firstName, lastName, employeeRole, employeeManager } =
          await inquirer.prompt([
            {
              type: "input",
              name: "firstName",
              message: "Enter the employee first name:",
              validate: (input) =>
                input ? true : "First name cannot be empty",
            },
            {
              type: "input",
              name: "lastName",
              message: "Enter the employee last name:",
              validate: (input) => (input ? true : "Last name cannot be empty"),
            },
            {
              type: "list",
              name: "employeeRole",
              message: "Select the employee role:",
              choices: roleChoices.map((role) => ({
                name: role.title,
                value: role.id,
              })),
            },
            {
              type: "list",
              name: "employeeManager",
              message: "Select the employee manager:",
              choices: employeeChoices.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
              })),
            },
          ]);

        await db.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [firstName, lastName, employeeRole, employeeManager]
        );
        console.log("Employee added successfully!");
        break;

      // Update an employee role
      case "Update an employee role":
        const updateRoleChoices = await db.query("SELECT * FROM role");
        const updateEmployeeChoices = await db.query("SELECT * FROM employee");

        const { chosenEmployee, newRole } = await inquirer.prompt([
          {
            type: "list",
            name: "chosenEmployee",
            message: "Select the employee to update:",
            choices: updateEmployeeChoices.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            })),
          },
          {
            type: "list",
            name: "newRole",
            message: "Select the new role for this employee:",
            choices: updateRoleChoices.map((role) => ({
              name: role.title,
              value: role.id,
            })),
          },
        ]);

        await db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
          newRole,
          chosenEmployee,
        ]);
        console.log("Employee role updated successfully!");
        break;
    
          // Exit
          case "Exit":
            console.log("Goodbye!");
            exit = true;
            break;  }
  }
}

main();
