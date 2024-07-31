import  React , { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Modal, Form, Row, Col, Container } from "react-bootstrap";
const {
  addContacts,
  editContacts,
} = require("../../helperFunctions/dataManipulation/contactsUtill");

export default function ContactModal({size, type, show ,data, updateContactList, onHide}) {
  const [contactData, setContactData] = useState([]);

  function handleInputChange(e) {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    if (data) {
      setContactData({ ...data });
    }
  }, [data]);
  
  // In Modal create and update Contact handle
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type == 'add') {
      addContacts(contactData);
      updateContactList
      setContactData({
        name: "",
        email: "",
        company: "",
        designation: "",
        phone: "",
        address: "",
      });
      onHide();
    } else {
      editContacts(contactData, data.id);
      updateContactList
      onHide();
    }
  };
  return (
    <>
      <Modal size={size} onHide={onHide} show={show} aria-labelledby="contacts-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contacts-modal">
            { type === "edit" ? (
              <>
                <FaEdit className="logo" size={25} /> Edit
              </>
            ) : (
              <>
                <FaPlus className="logo" size={25} /> Add
              </>
            )}{" "}
            Contact
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Container>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Label>
                    <b>Full Name</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    required
                    placeholder="Full name"
                    value={contactData.name}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>
                    <b>Email address</b>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    required
                    name="email"
                    placeholder="Email"
                    value={contactData.email}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Label className="mt-2">
                    <b>Phone</b>{" "}
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    required
                    minLength={9}
                    maxLength={10}
                    placeholder="Phone number"
                    value={contactData.phone}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label className="mt-2">
                    <b>Company</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    required
                    placeholder="Company name"
                    value={contactData.company}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Label className="mt-2">
                    <b>Designation</b>
                  </Form.Label>
                  <Form.Select
                    name="designation"
                    required
                    value={contactData.designation}
                    onChange={handleInputChange}
                  >
                    <option>Select designation</option>

                    <option value="DevOps">DevOps</option>
                    <option value="Secretory">Secretory</option>
                    <option value="Tech Lead">Tech Lead</option>
                    <option value="Designer">Designer</option>
                  </Form.Select>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label className="mt-2">
                    <b>Address</b>
                  </Form.Label>
                  <Form.Control
                    placeholder="Address"
                    name="address"
                    as="textarea"
                    rows={4}
                    value={contactData.address}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={3} md={3}>
              <Form.Control
                className="btn-custom"
                type="submit"
                value="submit"
              />
            </Col>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

ContactModal.propTypes = {
  data: PropTypes.object,
  size: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['add', 'edit']).isRequired,
  show: PropTypes.bool.isRequired,
  updateContactList: PropTypes.function,
  onHide: PropTypes.func.isRequired,
};