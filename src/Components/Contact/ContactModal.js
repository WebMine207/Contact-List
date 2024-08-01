import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Modal, Form, Row, Col, Container } from "react-bootstrap";
export default function ContactModal({
  size,
  type,
  show,
  data,
  addContact,
  updateContact,
  onHide,
}) {
  const [contactData, setContactData] = useState([]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!contactData.name) {
      newErrors.name = 'Name is required';
    }
    if (!contactData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!contactData.company) {
      newErrors.company = 'Company is required';
    }if (!contactData.designation) {
      newErrors.designation = 'Designation is required';
    }if (!contactData.phone) {
      newErrors.phone = 'Phone is required';
    }if (!contactData.address) {
      newErrors.address = 'Address is required';
    }
    return newErrors;
  };
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
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (type == "add") {
        addContact(contactData);
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
        updateContact(contactData, data.id);
        onHide();
      }
    }
   
  };
  return (
    <>
      <Modal
        size={size}
        onHide={onHide}
        show={show}
        aria-labelledby="contacts-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contacts-modal">
            {type === "edit" ? (
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
                    placeholder="Full name"
                    value={contactData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>
                    <b>Email address</b>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={contactData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
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
                    minLength={9}
                    maxLength={10}
                    placeholder="Phone number"
                    value={contactData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <p className="error">{errors.phone}</p>}
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label className="mt-2">
                    <b>Company</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    placeholder="Company name"
                    value={contactData.company}
                    onChange={handleInputChange}
                  />
                  {errors.company && <p className="error">{errors.company}</p>}
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Label className="mt-2">
                    <b>Designation</b>
                  </Form.Label>
                  <Form.Select
                    name="designation"
                    value={contactData.designation}
                    onChange={handleInputChange}
                  >
                    <option>Select designation</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Secretory">Secretory</option>
                    <option value="Tech Lead">Tech Lead</option>
                    <option value="Designer">Designer</option>
                  </Form.Select>
                  {errors.designation && <p className="error">{errors.designation}</p>}
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
                  {errors.address && <p className="error">{errors.address}</p>}
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
  type: PropTypes.oneOf(["add", "edit"]).isRequired,
  show: PropTypes.bool.isRequired,
  updateContact: PropTypes.function,
  addContact: PropTypes.function,
  onHide: PropTypes.func.isRequired,
};
