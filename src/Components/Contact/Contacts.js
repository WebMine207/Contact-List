import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";

export default function Contacts({
  filteredContacts,
  contactDetails,
  updatecontactlist,
  handleDelete,
  handleEdit,
  handleShowDetails,
  onDeleteSelected,
}) {
 
  return (
    <>
      <ContactList
        filteredContacts={filteredContacts}
        showDetails={handleShowDetails}
        onDeleteSelected={onDeleteSelected}
      />
      {contactDetails && (
        <ContactDetails
          showContact={contactDetails}
          updatecontactlist={updatecontactlist}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          />
      )}
    </>
  );
}

Contacts.propTypes = {
  filteredContacts: PropTypes.array,
  contactDetails: PropTypes.object,
  updatecontactlist: PropTypes.func,
  handleDelete: PropTypes.func,
  handleShowDetails: PropTypes.func,
  onDeleteSelected: PropTypes.func,
  handleEdit : propTypes.func
};