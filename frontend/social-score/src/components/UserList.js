import React, { useState, useEffect } from "react"
import { Container, Col, Row  } from 'react-bootstrap';

function getBorderStyle(isSelected) {
    if (isSelected) return '2px solid #0376db';
    else return '1px solid #ccc'
}

function User({user, isSelected, onClick}) {
    return (
        <div className="rounded hover-effect" style={{ border: getBorderStyle(isSelected), padding: '10px', marginBottom: 20 }} onClick={() => onClick(user.pesel)}>
            <Col style={{padding: 5}}>
                <p className="text-primary">{user.name} {user.surname}</p>
                <p className="text-muted">{user.address}, {user.city}</p>
                <p className="text-muted">{user.zipCode}</p>
            </Col>
        </div>
    );
}

export default function UserList({users, selectedUserId, onClick}) {
    return (
        <div >
            {users.map( user =>
                <User user={user} isSelected={user.pesel === selectedUserId} onClick={onClick}/>
            )}
        </div>
    );
}