import React, { useState, useEffect } from "react"
import { Container, Col, Row  } from 'react-bootstrap';
import SearchBox from "../components/Searchbox";
import UserList from "../components/UserList";

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

function ReviewInput({onDataChange, onNumberChange, onSubmit}) {
    return(
        <Form>
            <FormControl type="number" placeholder="Wprowadź ocenę od 1-10" onTextChange={onNumberChange}/>
            <FormControl type="text" placeholder="Opisz swoją recenzję" onTextChange={onDataChange}/>
            <Button variant="primary" onClick={onSubmit}>Submit</Button>
        </Form>
    );
}

export default function AddReview() {
    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(0);

    const onDataChange = (e) => {
        let newData = {...reviewData};
        newData.description = e.target.value;
        setReviewData(newData);
    }

    const onNumberChange = (e) => {
        let newData = {...reviewData};
        newData.rating = parseInt(e.target.value,10);
        setReviewData(newData);
    }

    const onSearchClick = async () => {
        let words = searchText.split(" ");
        let users = await loadUserData(words[0], words[1]);
        setUsers(users);
    }

    const onSubmit = () => {
        let newData = {
            ...reviewData,
            subject: selectedUserId,
            author: selectedUserId
        };
        loadReviewData(newData);
    }

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
                    <ReviewInput onDataChange={onDataChange} onNumberChange={onNumberChange} onSubmit={onSubmit} />
                </Col>
                </Row>
            </Container>
        </div>
    );
}