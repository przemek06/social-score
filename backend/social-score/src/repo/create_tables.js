const pool = require("./pool")

const dropTables = async () => {
    const dropQuery = `
        DROP table IF EXISTS user_;
    `
}

const createUserTable = async () => {

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS user_ (
        id SERIAL NOT NULL,
        pesel VARCHAR(11) NOT NULL UNIQUE,
        email VARCHAR(64),
        "name" VARCHAR(64),
        surname VARCHAR(64),
        "password" VARCHAR(64),
        "height" REAL,
        weight REAL,
        education INT,
        address VARCHAR(200),
        city VARCHAR(50),
        zipCode  VARCHAR(6),
        PRIMARY KEY (id)
      );      
    `

    await pool.query(createTableQuery)
}

const setupDatabase = async () => {
    createUserTable()
}

module.exports = setupDatabase