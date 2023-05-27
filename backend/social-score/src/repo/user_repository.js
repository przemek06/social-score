const pool = require("./pool")

const insertUser = async (user) => {
    const pesel = user['pesel']
    const email = user['email']
    const name = user['name']
    const role = "USER"
    const surname = user['surname']
    const password = user['password']
    const height = user['height']
    const weight = user['weight']
    const education = user['education']
    const address = user['address']
    const city = user['city']
    const zipCode = user['zipCode']


    const query = `
        INSERT INTO user_ 
        (pesel, email, "name", role, surname, "password", "height", weight, education, address, city, zipCode) 
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        ) 
        RETURNING *
    `
    return (await pool.query(query, [pesel, email, name, role, surname, password, height, weight, education, address, city, zipCode])).rows

} 

const selectUserByPesel = async (pesel) => {
    const query = `
        SELECT * FROM user_ WHERE PESEL = $1
    `

    return (await pool.query(query, [pesel])).rows

}

const selectUserByFullName = async (name, surname) {
    const query = `
    SELECT * FROM user_ WHERE "name" = $1 AND surname = $2
    `

return (await pool.query(query, [name, surname])).rows
}

module.exports = {
    insertUser,
    selectUserByPesel
}