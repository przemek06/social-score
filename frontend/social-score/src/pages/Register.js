import React, { useState, useEffect } from "react"
import { Container, Form, Button, Dropdown,  Row, Col, Nav  } from 'react-bootstrap';

const DropdownComponent = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Select an option
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item href="#action1">Option 1</Dropdown.Item>
          <Dropdown.Item href="#action2">Option 2</Dropdown.Item>
          <Dropdown.Item href="#action3">Option 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

const Register = () => {
    const [data, setData] = useState({
        pesel: "",
        email: "",
        name: "",
        surname: "",
        password: "",
        height: "",
        weight: "",
        education: "0",
        address: "",
        city: "",
        zipCode: "",
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
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', padding: '20px', backgroundColor: 'palevioletred'}}>
            <div style={{backgroundColor: 'white', padding: '30px', width: '80vh', borderRadius: '15px'}}>
            <Container>
                <h1>Utwórz nowe konto</h1>
                <Form onSubmit={handleRegister}>
                <Row>
                    <Col md={6}  className="mr-[20px]">
                        <div>
                        <Form.Group controlId="formPesel" className="mb-3">
                            <Form.Label>Pesel</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Wpisz pesel"
                            value={data.pesel}
                            onChange={(e) => onDataChange(e, 'pesel')}
                            />
                        </Form.Group>
                
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Adres email</Form.Label>
                            <Form.Control
                            type="email"
                            placeholder="Wpisz adres email"
                            value={data.email}
                            onChange={(e) => onDataChange(e, 'email')}
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

                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Imię</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Wpisz imię"
                            value={data.pesel}
                            onChange={(e) => onDataChange(e, 'name')}
                            />
                        </Form.Group>

                        <Form.Group controlId="formSurname" className="mb-3">
                            <Form.Label>Nazwisko</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Wpisz nazwisko"
                            value={data.surname}
                            onChange={(e) => onDataChange(e, 'surname')}
                            />
                        </Form.Group>

                        <Form.Group controlId="formHeight" className="mb-3">
                            <Form.Label>Wzrost</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Wpisz wzrost"
                            value={data.height}
                            onChange={(e) => onDataChange(e, 'height')}
                            />
                        </Form.Group>
                        </div>
                    </Col>
                    <Col md={6}>
                    <div>
                    <Form.Group controlId="formWeight" className="mb-3">
                        <Form.Label>Waga</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Wpisz wagę"
                        value={data.weight}
                        onChange={(e) => onDataChange(e, 'weight')}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEducation" className="mb-3">
                        <Form.Label>Wyształcenie</Form.Label>
                        <Dropdown onSelect={(e) => onDropdownChange(e, 'education')}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {getDropdownText(data.education)}
                            </Dropdown.Toggle>
                    
                            <Dropdown.Menu>
                            <Dropdown.Item eventKey="0">{getDropdownText("0")}</Dropdown.Item>
                            <Dropdown.Item eventKey="1">{getDropdownText("1")}</Dropdown.Item>
                            <Dropdown.Item eventKey="2">{getDropdownText("2")}</Dropdown.Item>
                            <Dropdown.Item eventKey="3">{getDropdownText("3")}</Dropdown.Item>
                            <Dropdown.Item eventKey="4">{getDropdownText("4")}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group controlId="formAddress" className="mb-3">
                        <Form.Label>Adres</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Wpisz adres zamieszkania"
                        value={data.address}
                        onChange={(e) => onDataChange(e, 'address')}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCity" className="mb-3">
                        <Form.Label>Miasto</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Wpisz miasto zamieszkania"
                        value={data.city}
                        onChange={(e) => onDataChange(e, 'city')}
                        />
                    </Form.Group>

                    <Form.Group controlId="formZipCode" className="mb-3">
                        <Form.Label>Kod pocztowy</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Wpisz kod pocztowy"
                        value={data.zipCode}
                        onChange={(e) => onDataChange(e, 'zipCode')}
                        />
                    </Form.Group>
                    </div>
                    </Col>
                </Row>
        
                <div style={{display: "flex"}}>
                    <Button variant="primary" type="submit">
                        Zarejestruj się
                    </Button>
                    <Nav>
                        <Nav.Link href="/login">Powrót</Nav.Link>
                    </Nav>
                </div>
                
                </Form>
            </Container>
            </div>
        </div>
    );
  };
  
  export default Register;