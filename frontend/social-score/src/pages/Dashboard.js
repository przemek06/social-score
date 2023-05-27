import React, { useState, useEffect } from "react"
import { Container, Col, Row  } from 'react-bootstrap';
import SearchBox from "../components/Searchbox";
import ReviewList from "../components/ReviewList";
import UserList from "../components/UserList";

export default function Dashboard() {
    const [searchText, setSearchText] = useState("");
    const [reviews, setReviews] = useState([
        {
            rating: 5,
            text: "great frend"
        },
        {
            rating: 3,
            text: "nah uh"
        },
    ]);
    const [users, setUsers] = useState([
        {
            pesel: "217",
            name: "Alan",
            surname: "Walker",
            address: "ul. Elona",
            city: "Wrocław",
            zipCode: "50-098"
        },
        {
            pesel: "218",
            name: "Alan",
            surname: "Walker",
            address: "ul. Elona",
            city: "Wrocław",
            zipCode: "50-098"
        },
    ]);
    const [selectedUserId, setSelectedUserId] = useState("");

    return (
        <div style={{padding: '20px'}}>
            <Container>
                <Row>
                <Col md={4} className="px-4">
                    <h4 style={{marginBottom: '20px'}}>Znajdź użytkownika</h4>
                    <SearchBox text={searchText} onTextChange={(v) => setSearchText(v)} />
                    <UserList users={users} selectedUserId={selectedUserId} onClick={(id) => setSelectedUserId(id)}/>
                </Col>
                <Col md={8} style={{ paddingLeft: '60px', paddingRight: '20px' }}>
                    <ReviewList reviews={reviews} />
                </Col>
                </Row>
            </Container>
        </div>
    );
}