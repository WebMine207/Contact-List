import { useState, useMemo } from "react";
import Search from "./Search";
import Contacts from "./Contacts";
import ContactModal from "./ContactModal";

const {
  getContacts,
  clearContactsCache,
  getNextContactId,
} = require("../../helperFunctions/dataManipulation/contactsUtill");

export default function Content(updatecontactlist, showModal) {
  const [modalShow, setModalShow] = useState(false);
  const [allContacts, setAllContacts] = useState(getContacts());
  const [filteredContacts, setFilteredContacts] = useState(allContacts);
  const [selectedContact, setSelectedContact] = useState("");
  const [editContact, setEditContact] = useState([]);
  const [modalType, setModalType] = useState([]);

  const contactDetails = useMemo(
    () => getContactById(selectedContact),
    [selectedContact]
  );

  // Begining:: Common Functions.
  // Get selected contact details by ID
  function getContactById(id) {
    var contact = null;
    if (allContacts != null) {
      contact = allContacts.find((contact) => contact.id === id);
    }
    return contact;
  }
  // Filtered the contacts as per search
  function filterTable(text) {
    if (text != "") {
      const filter = text.toLowerCase();
      let filteredData = null;
      let filteredContacts = allContacts;
      if (filteredContacts != null) {
        filteredData = filteredContacts.filter((contact) => {
          return (
            contact.name.toLowerCase().includes(filter) ||
            contact.company.toLowerCase().includes(filter) ||
            contact.email.toLowerCase().includes(filter)
          );
        });
      }
      return filteredData;
    } else {
      return allContacts;
    }
  }
  // Create contact & add to local storage
  function addContact(contactData) {
    let id = getNextContactId();
    let newContact = {
      id: id,
      name: contactData.name,
      email: contactData.email,
      company: contactData.company,
      designation: contactData.designation,
      phone: contactData.phone,
      address: contactData.address,
    };
    allContacts.push(newContact);
    localStorage.setItem("contacts", JSON.stringify(allContacts));
  }
  function handleEdit(id) {
    setModalType("edit");
    setEditContact(getContactById(id));
    setModalShow(true);
  }
  function handleSearch(text) {
    var filteredData = filterTable(text.toLowerCase());
    setFilteredContacts(filteredData);
  }
  function updateContactList() {
    clearContactsCache();
    setAllContacts(allContacts);
    handleShowDetails(selectedContact);
  }
  function handleShowDetails(id) {
    setSelectedContact(id);
  }
  function handleDeleteSelected(ids) {
    const updatedContacts = allContacts.filter(
      (contact) => !ids.includes(contact.id)
    );
    setFilteredContacts(updatedContacts);
    handleShowDetails();
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  }
  function deleteContact(id) {
    const confirmation = window.confirm(
      "Are you sure you want to delete this contact ?"
    );
    if (confirmation) {
      var index = allContacts.findIndex(
        (contact) => contact.id === parseInt(id)
      );
      if (index !== -1) {
        allContacts.splice(index, 1);
        localStorage.setItem("contacts", JSON.stringify(allContacts));
      }
      updateContactList();
      handleShowDetails();
    }
  }
  // Edit contact & update changes on local storage
  function updateContact(contactData, id) {
    var index = allContacts.findIndex((contact) => contact.id === parseInt(id));
    if (index !== -1) {
      allContacts[index].name = contactData.name;
      allContacts[index].email = contactData.email;
      allContacts[index].phone = contactData.phone;
      allContacts[index].company = contactData.company;
      allContacts[index].designation = contactData.designation;
      allContacts[index].address = contactData.address;
      localStorage.setItem("contacts", JSON.stringify(allContacts));
    } else {
      window.alert("Contact not updated. Something went wrong.");
    }
  }
  // END:: Common Functions.

  
  return (
    <>
      <div className="content" id="content">
        <ContactModal
          size="xl"
          type={modalType}
          show={modalShow}
          data={editContact}
          addContact={addContact}
          updateContact={updateContact}
          updateContactList={updatecontactlist}
          onHide={() => setModalShow(false)}
        />
        <div className="search-bar">
          <Search
            modalShow={showModal}
            showModal={() => {
              setEditContact(null);
              setModalType("add");
              setModalShow(true);
            }}
            handleSearch={handleSearch}
            updatecontactlist={updateContactList}
          />
        </div>
        <div className="contacts">
          <Contacts
            filteredContacts={filteredContacts}
            contactDetails={contactDetails}
            handleEdit={handleEdit}
            updatecontactlist={updateContactList}
            handleDelete={deleteContact}
            handleShowDetails={handleShowDetails}
            onDeleteSelected={handleDeleteSelected}
          />
        </div>
      </div>
    </>
  );
}
