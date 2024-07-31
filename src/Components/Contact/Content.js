import { useState, useMemo } from "react";
import Search from "./Search";
import Contacts from "./Contacts";
import ContactModal from "./ContactModal";

const {
  getContacts,
  filterTable,
  clearContactsCache,
  getContactById,
  removeContact,
} = require("../../helperFunctions/dataManipulation/contactsUtill");


export default function Content(updatecontactlist, showModal) {
  const [modalShow, setModalShow] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState(getContacts());
  const [selectedContact, setSelectedContact] = useState('');
  const [editContact, setEditContact] = useState([]);
  const [modalType, setModalType] = useState([]);

  const contactDetails = useMemo(
    () => getContactById(selectedContact),
    [selectedContact]
  );
    function handleEdit(id) {
      setModalType('edit');
      setEditContact(getContactById(id));
      setModalShow(true);    
    }
    function handleSearch(text) {
      var filteredData =  filterTable(text.toLowerCase());
      setFilteredContacts(filteredData);
    }
    function updateContactList() {
      clearContactsCache();
      setFilteredContacts(filteredContacts);
      handleShowDetails(selectedContact);
    }
    function handleShowDetails(id) {
      setSelectedContact(id);
    }
    function handleDeleteSelected(ids) {
      const updatedContacts = filteredContacts().filter(
        (contact) => !ids.includes(contact.id)
      );
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      updateContactList();
    }
    function deleteContact(id) {
      const confirmation = window.confirm("Are you sure you want to delete this contact ?");
      if (confirmation) {
        removeContact(id);
        updateContactList();
        handleShowDetails();
      }
    }
  return (
    <>
      <div className="content" id="content">
      <ContactModal
        size="xl"
        type={modalType}
        show={modalShow}
        data={editContact}
        updateContactList={updatecontactlist}
        onHide={() => setModalShow(false)}
      />
        <div className="search-bar">
          <Search
            modalShow={showModal}
            showModal={() =>{ setEditContact(null); setModalType('add'); setModalShow(true)}}
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
