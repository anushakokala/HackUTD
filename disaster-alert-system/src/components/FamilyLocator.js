import React, { useState } from 'react';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';


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
    <div className="family-locator-container">
      <h2 className="family-locator-title">Family Locator</h2>
      
      {/* Form to Add Family Member */}
      <Row className="form-row">
        <Col>
          <Form.Control
            placeholder="Family Member Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="form-input"
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="form-input"
          />
        </Col>
      </Row>
      <Button className="add-member-button" onClick={addFamilyMember}>Add Family Member</Button>

      {/* Display Stored Family Members */}
      <div className="family-members-list">
        <h3 className="family-members-title">Stored Family Members:</h3>
        {familyMembers.length > 0 ? (
          familyMembers.map((member, index) => (
            <Card key={index} className="family-member-card">
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Text>
                  Latitude: {member.latitude}<br />
                  Longitude: {member.longitude}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No family members added yet.</p>
        )}
      </div>
    </div>
  );
}

export default FamilyLocator;
