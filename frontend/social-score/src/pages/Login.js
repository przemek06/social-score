import React, { useState, useEffect } from "react"
import { Container, Form, Button, Dropdown,  Row, Col, Nav  } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const loadReviewData = async (data) => {
    let requestBody = JSON.stringify(data);
    let response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: requestBody,
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

const Login = ({onUserChange}) => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        pesel: "",
        password: "",
    });
  
    const handleLogin = async (e) => {
      e.preventDefault();
      let user = await loadReviewData(data);
      navigate("/");
      onUserChange(user.role);
    };

    const onDataChange = (e, value) => {
        let newData = {...data};
        newData[value] = e.target.value;
        setData(newData);
    };
  
    return (
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', padding: '20px', backgroundColor: 'plum'}}>
            <div style={{backgroundColor: 'white', padding: '30px', width: '50vh', borderRadius: '15px'}}>
            <Container>
                <h1 style={{marginBottom: 30}}>Zaloguj się</h1>
                <Form onSubmit={handleLogin}>
                <Form.Group controlId="formPesel" className="mb-3">
                    <Form.Label>Pesel</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Wpisz pesel"
                    value={data.pesel}
                    onChange={(e) => onDataChange(e, 'pesel')}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Wpisz hasło"
                    value={data.password}
                    onChange={(e) => onDataChange(e, 'password')}
                    />
                </Form.Group>
        
                <div style={{display: "flex", marginTop: 30}}>
                    <Button variant="primary" type="submit">
                        Zaloguj się
                    </Button>
                    <Button variant="outline-dark" type="submit" href="/register" style={{marginLeft: 10}}>
                        Zarejestruj się
                    </Button>
                </div>
                
                </Form>
            </Container>
            </div>
        </div>
    );
  };
  
  export default Login;