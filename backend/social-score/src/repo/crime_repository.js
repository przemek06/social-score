const pool = require("./pool")

const insertCrime = async (crime) => {
    const name = review["name"]
    const weight = review["weight"]
    const subject = review["subject"]

    const query = `
        INSERT INTO crime 
        (name, weight, subject) 
        VALUES (
            $1, $2, $3
        ) 
        RETURNING *
    `

    return await pool.query(query, [name, weight, subject]).rows
}

const getCrimeBySubject = async (pesel) => {

    const query = `
        select c.* from crime c
        join user_ u on c.subject = u.pesel
        where u.pesel = $1
    `

    return await pool.query(query, [pesel]).rows

}