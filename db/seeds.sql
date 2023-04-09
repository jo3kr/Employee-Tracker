USE employee_tracker;

INSERT INTO department (name)
VALUES ('Engineering'), ('Marketing'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Captain', 80000, 1),
       ('Swordsman', 60000, 2),
       ('Achaeologist', 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Monkey', 'Luffy', 1, NULL),
       ('Roronoa', 'Zoro', 2, 1),
       ('Nico', 'Robin', 3, 1);
