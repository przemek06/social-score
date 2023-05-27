const pool = require("./pool")

const insertGoodAct = async (goodAct) => {
    const name = goodAct["name"]
    const weight = goodAct["weight"]
    const subject = goodAct["subject"]

    const query = `
        INSERT INTO good_act 
        (name, weight, subject) 
        VALUES (
            $1, $2, $3
        ) 
        RETURNING *
    `

    return (await pool.query(query, [name, weight, subject])).rows
}

const getGoodActBySubject = async (pesel) => {

    const query = `
        select ga.* from good_act ga
        join user_ u on ga.subject = u.pesel
        where u.pesel = $1
    `

    return (await pool.query(query, [pesel])).rows

}

module.exports = {
    insertGoodAct,
    getGoodActBySubject
}
