import React, { useState, useEffect } from "react"
import { Container, Form, Button, Dropdown,  Row, Col, Nav  } from 'react-bootstrap';

const Login = () => {
    const [data, setData] = useState({
        pesel: "",
        password: "",
    });
  
    const handleRegister = (e) => {
      e.preventDefault();
      // Handle registration logic here
    };

    const onDataChange = (e, value) => {
        let newData = {...data};
        newData[value] = e.target.value;
        setData(newData);
    };

    const onDropdownChange = (e, value) => {
        let newData = {...data};
        newData[value] = e;
        setData(newData);
    };

    const getDropdownText = (num) => {
        switch(num) {
            case "0":
              return "Brak wykształcenia";
            case "1":
                return "Podstawowe";
            case "2":
                return "Średnie";
            case "3":
                return "Wyższe";
            case "4":
                return "Doktorat";
            default:
                return "Brak wykształcenia";
        }
    }
  
    return (
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', padding: '20px', backgroundColor: 'plum'}}>
            <div style={{backgroundColor: 'white', padding: '30px', width: '50vh', borderRadius: '15px'}}>
            <Container>
                <h1 style={{marginBottom: 30}}>Zaloguj się</h1>
                <Form onSubmit={handleRegister}>
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