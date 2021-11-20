DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;


CREATE TABLE department (
    id INTEGER AUTO_INCRIMENT NOT NULL PRIMARY_KEY,
    name varChar(30),
    description TEXT
);

CREATE TABLE roles (
    id INTEGER AUTO_INCRIMENT NOT NULL PRIMARY_KEY,
    title varChar(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INTEGER AUTO_INCRIMENT NOT NULL PRIMARY_KEY,
    first_name varChar(30),
    last_name varChar(30),
    role_id INTEGER NOT NULL,
    manager_id INTEGER NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    -- CONSTRAINT fk_manager FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);