import React, { useState, useEffect } from "react"
import { Container, Col, Row  } from 'react-bootstrap';
import SearchBox from "../components/Searchbox";
import ReviewList from "../components/ReviewList";
import UserList from "../components/UserList";

const loadReviewData = async (pesel, setReviews) => {
    let response = await fetch("http://localhost:5000/review/" + pesel, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "omit",
      mode: "cors",
      referrerPolicy: "no-referrer",
      origin: 'http://localhost:3000'
    });
  
    if (response.status == 200) {
      let json = await response.json()
      setReviews(json)
      return json
    } else {
      console.log("error")
    }
  }

  const loadUserData = async (name, surname) => {
    let response = await fetch("http://localhost:5000/user/" + name + "/" + surname, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "omit",
      mode: "cors",
      referrerPolicy: "no-referrer",
      origin: 'http://localhost:3000'
    });
  
    if (response.status == 200) {
      let json = await response.json()
      return json
    } else {
      console.log("error")
    }
  }


export default function Dashboard() {
    const [searchText, setSearchText] = useState("");
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");

    const onSearchClick = async () => {
        let words = searchText.split(" ");
        let users = await loadUserData(words[0], words[1]);
        setUsers(users);
    }

    useEffect(() => {
        loadReviewData(selectedUserId, setReviews);
      }, [selectedUserId]);

    return (
        <div style={{padding: '20px'}}>
            <Container>
                <Row>
                <Col md={4} className="px-4">
                    <h4 style={{marginBottom: '20px'}}>Znajdź użytkownika</h4>
                    <SearchBox text={searchText} onTextChange={(v) => setSearchText(v.target.value)} onSearch={onSearchClick}/>
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