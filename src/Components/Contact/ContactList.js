import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaExpandAlt } from "react-icons/fa";

export default function ContactList({
  showDetails,
  filteredContacts,
  onDeleteSelected,
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = filteredContacts.map((contact) => contact.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };
  return (
    <>
      <div className="list">
        <button
          className="btn-custom"
          onClick={() => onDeleteSelected(selectedIds)}
        >
          {" "}
          Delete Selected
        </button>
        <table id="dataTable">
          <thead>
            <tr>
              <td className="selection">
                <input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === filteredContacts.length} />
              </td>
              <td className="info">Basic Info</td>
              <td className="company">Company</td>
            </tr>
          </thead>
          <tbody className="data" id="contacts-list">
            {filteredContacts != null && filteredContacts.length != 0 ? (
              filteredContacts.map((item) => {
                return (
                  <Contactdata
                    data={item}
                    showDetails={showDetails}
                    key={item.id}
                    isSelected={selectedIds.includes(item.id)}
                    onSelect={handleSelect}
                  />
                );
              })
            ) : (
              <th className="not-found" colSpan="3">
                {"No record found"}
              </th>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

ContactList.propTypes = {
  showDetails: PropTypes.func.isRequired,
  filteredContacts: PropTypes.array,
  onDeleteSelected: PropTypes.func.isRequired,
};

function Contactdata({ data, showDetails, isSelected, onSelect }) {
  var shortName = "";
  if (data.name) {
    var nameParts = data.name.split(" ") || "";
    shortName = nameParts.map((part) => part.charAt(0)).join("");
  }
  return (
    <tr>
      <td className="selection">
        <input
          type="checkbox"
          className="select"
          data-id="{contact.id}"
          checked={isSelected}
          onChange={() => onSelect(data.id)}
          name="select"
        />
      </td>
      <td className="info" onClick={() => showDetails(data.id)}>
        <div className="round-image" id="profileImage">
          {shortName}
        </div>
        <div>
          <div>{data.name}</div>
          <span>{data.designation}</span>
        </div>
        <div className="collapse d-none">
          <a href="/" className="btn-collapse">
            <FaExpandAlt />
          </a>
        </div>
      </td>
      <td className="company">{data.company}</td>
    </tr>
  );
}

Contactdata.propTypes = {
  data: PropTypes.array,
  showDetails: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
