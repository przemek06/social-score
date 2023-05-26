const pool = require("./pool")

const dropTables = async () => {
    const query = `
        DROP table IF EXISTS crime;
        DROP table IF EXISTS review;
        DROP table IF EXISTS user_;
    `

    return await pool.query(query)
}

const createUserTable = async () => {

    const query = `
    CREATE TABLE IF NOT EXISTS user_ (
        pesel VARCHAR(11) NOT NULL,
        email VARCHAR(64),
        "role" VARCHAR(64),
        "name" VARCHAR(64),
        surname VARCHAR(64),
        "password" VARCHAR(64),
        "height" real,
        weight real,
        education INT,
        address VARCHAR(200),
        city VARCHAR(50),
        zipCode  VARCHAR(6),
        PRIMARY KEY (pesel)
      ) 
    `

    return await pool.query(query)
}

const createReviewTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS review (
        id SERIAL not null,
        rating INT,
        description VARCHAR(1024),
        author VARCHAR(11)  references user_(pesel),
        subject VARCHAR(11)  references user_(pesel),
        CONSTRAINT unique_column_pair UNIQUE (author, subject),
        PRIMARY KEY(id)
    )  
    `

    await pool.query(query)
}

const createCrimeTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS crime (
        id SERIAL not null,
        "name" VARCHAR(64),
        weight INT,
        subject VARCHAR(11)  references user_(pesel),
        PRIMARY KEY(id)
    )  
    `

    await pool.query(query)
}

const setupDatabase = async () => {
    await dropTables()
    await createUserTable()
    await createReviewTable()
    await createCrimeTable()
}

module.exports = setupDatabase