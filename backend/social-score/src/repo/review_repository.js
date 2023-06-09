const pool = require("./pool")

const insertReview = async (review) => {
    const rating = review["rating"]
    const description = review["description"]
    const subject = review["subject"]
    const author = review["author"]

    const query = `
        INSERT INTO review 
        (rating, description, subject, author) 
        VALUES (
            $1, $2, $3, $4
        ) 
        RETURNING *
    `

    return (await pool.query(query, [rating, description, subject, author])).rows
}

const getReviewBySubject = async (pesel) => {

    const query = `
        select r.* from review r
        join user_ u on r.subject = u.pesel
        where u.pesel = $1;
    `

    return (await pool.query(query, [pesel])).rows

}

const getReviews = async () => {

    const query = `
        select * from review r
        join user_ u on u.pesel = r.subject 
    `

    return (await pool.query(query, [])).rows

}

module.exports = {
    insertReview,
    getReviewBySubject,
    getReviews
}
