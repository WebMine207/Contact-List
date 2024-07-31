var allContacts = null;

export function getContacts() {
  
  if (allContacts === null) {
    if (localStorage.getItem("contacts") === null) {
      allContacts = [];
    } else {
      var contacts = localStorage.getItem("contacts");
      if (contacts.length > 0) {
        allContacts = JSON.parse(contacts);
      }
    }
  }
  return allContacts;
}

export function clearContactsCache() {
  allContacts = null;
}

  // Get selected contact details by ID
  export function getContactById(id) {
    var contact = null;
    if (allContacts != null) {
      contact = allContacts.find((contact) => contact.id === id);
    }
    return contact;
  }

// Filtered the contacts as per search
export function filterTable(text) {
  const filter = text.toLowerCase();
  var filteredData = null;
  if (allContacts != null) {
    filteredData = allContacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(filter) ||
        contact.company.toLowerCase().includes(filter) ||
        contact.email.toLowerCase().includes(filter)
      );
    });
  }
  return filteredData;
}

// Manage the next contact ID on local.
export function getNextContactId() {
  let nextId = parseInt(localStorage.getItem("nextContactId"), 10);
  if (isNaN(nextId)) {
    nextId = 1;
  }
  localStorage.setItem("nextContactId", nextId + 1);
  return nextId;
}

// Create contact & add to local storage
export function addContacts(contactData) {
  if (allContacts == null) {
    allContacts = [];
  }
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

// Edit contact & update changes on local storage
export function editContacts(contactData, id) {
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

export function removeContact(id) {
  var index = allContacts.findIndex((contact) => contact.id === parseInt(id));
  if (index !== -1) {
    allContacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(allContacts));
  }
}
