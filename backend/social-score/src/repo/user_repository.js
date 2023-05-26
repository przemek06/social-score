const pool = require("./pool")

const insertUser = async (user) => {
    const pesel = user['pesel']
    const email = user['email']
    const name = user['name']
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
        (pesel, email, "name", surname, "password", "height", weight, education, address, city, zipCode) 
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
        ) 
        RETURNING *
    `
    return (await pool.query(query, [pesel, email, name, surname, password, height, weight, education, address, city, zipCode])).rows

} 

const selectUserByPesel = async (pesel) => {
    const query = `
        SELECT * FROM user_ WHERE PESEL = $1
    `

    return (await pool.query(query, [pesel])).rows

}

module.exports = {
    insertUser,
    selectUserByPesel
}