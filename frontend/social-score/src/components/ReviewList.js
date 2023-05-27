import React, { useState, useEffect } from "react"
import { Container, Col, Row  } from 'react-bootstrap';

function Review({review}) {
    return (
        <div className="rounded" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: 20 }}>
            <Col style={{padding: 5}}>
                <h4 className="text-primary">Ocena: {review.rating}</h4>
                <hr/>
                <p className="text-muted">{review.description}</p>
            </Col>
        </div>
    );
}

function ReviewsOrNone({reviews}) {
    if (reviews.length <= 0)
        return <p>Wybierz jedną osobę aby wyświetlić opinie.</p>;
    else return (
        <div>
            {reviews.map( review =>
                <Review review={review} />
            )}
        </div>
    )
}

export default function ReviewList({reviews}) {
    return (
        <ReviewsOrNone reviews={reviews} />
    );
}