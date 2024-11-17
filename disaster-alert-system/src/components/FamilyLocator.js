import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';

function FamilyLocator() {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);

  const addFamilyMember = () => {
    const newMember = { name, latitude, longitude };
    const updatedMembers = [...familyMembers, newMember];
    setFamilyMembers(updatedMembers);
    localStorage.setItem('familyMembers', JSON.stringify(updatedMembers));
  };

  return (
    <div>
      <h2>Family Locator</h2>
      <Row>
        <Col>
          <Form.Control
            placeholder="Family Member Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </Col>
      </Row>
      <Button onClick={addFamilyMember}>Add Family Member</Button>
      <div>
        <h3>Stored Family Members:</h3>
        {familyMembers.map((member, index) => (
          <p key={index}>
            {member.name}: {member.latitude}, {member.longitude}
          </p>
        ))}
      </div>
    </div>
  );
}

export default FamilyLocator;
