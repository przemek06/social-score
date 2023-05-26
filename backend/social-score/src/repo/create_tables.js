const pool = require("./pool")

const createUserTable = async () => {

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS user_ (
            user_id INT NOT NULL,
            pesel VARCHAR(9) NOT NULL UNIQUE,
            PRIMARY KEY (user_id)
        );
    `

    return pool.query(createTableQuery, (error, results) => {
        if (error) {
            throw error
        }
        return results
    })
}

module.exports = createUserTable