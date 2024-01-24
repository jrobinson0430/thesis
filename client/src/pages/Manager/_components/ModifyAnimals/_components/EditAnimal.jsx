import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import {
  Form, FormControl, Container, Row, Col, Button,
} from 'react-bootstrap';

const EditAnimal = ({ managerBox, modifyBox }) => {
  const {
    lookups, state, hooks, handles,
  } = managerBox;
  const { formData, validated, editId } = state;
  const { setFormData, setValidated, setEditId } = hooks;
  const { handleOnChange, handleUpdateAnimal } = handles;

  useEffect(() => () => {
    setFormData({});
    setEditId('');
    setValidated(false);
  }, []);

  return (
    <Container>
      <Form
        noValidate // prevents browsers default validation behavior
        validated={validated}
        className="formStyle border1 mt-5"
        onSubmit={handleUpdateAnimal}
      >
        <h1 className="text-center">Edit Animal</h1>
        <Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>Animal Name</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              className="shadow1"
              placeholder="Animal Name"
              value={formData.name || ''}
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide an animal name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="photo">
            <Form.Label>Animal Photo (optional)</Form.Label>
            <FormControl
              required
              className="shadow1"
              name='photo'
              type="file"
              accept=".jpeg, .png"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a picture.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="animalType">
            <Form.Label>Animal Type</Form.Label>
            <Form.Control
              required
              name="animalType"
              as="select"
              className="shadow1"
              value={formData.animalType || ''}
              onChange={handleOnChange}
            >
              <option value=''>Choose Animal...</option>
              {
                  lookups.animalTypes.map((type) => (
                    <option value={type} key={v4()}>{type}</option>
                  ))
                }
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please provide an animal type.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} sm={6} md={4} controlId="breed">
            <Form.Label>Animal Breed (if known)</Form.Label>
            <Form.Control
              name="breed"
              type="text"
              className="shadow1"
              placeholder="Animal Breed"
              value={formData.breed || ''}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="age">
            <Form.Label>Animal Age</Form.Label>
            <Form.Control
              name="age"
              required
              min="0"
              type="number"
              className="shadow1"
              placeholder="Animal Age"
              value={formData.age || ''}
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide the animals age (approximation if necessary)
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="history">
            <Form.Label>History of Animal</Form.Label>
            <Form.Control
              required
              name="history"
              as="textarea"
              className="shadow1"
              placeholder="Brief History Of Animal"
              value={formData.history || ''}
              onChange={handleOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a brief history of the animal.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className="d-flex justify-content-end">
          <Button
            variant="dark"
            className="mt-2 actionBtn shadow1"
            type="submit"
          >
            Update Animal
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditAnimal;
