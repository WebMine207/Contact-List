import React, { memo } from "react";
import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";
import { FaTrash, FaEdit } from "react-icons/fa";

function ContactDetails({showContact, handleDelete, handleEdit}) {
  
  var shortName = "";
  if (showContact.name) {
    var nameParts = showContact.name.split(" ") || "";
    shortName = nameParts.map((part) => part.charAt(0)).join("");
  }
  return (
    <>
      <div className="details" id="show-details">
        <div
          onClick={() =>  handleEdit(showContact.id)}
          className="edit-btn"
          id="edit-btn"
          data-id="0"
        >
          <FaEdit className="logo" size={25} />
        </div>

        <div
          className="delete-btn"
          id="delete-btn"
          data-id="0"
          onClick={() => handleDelete(showContact.id)}
        >
          <FaTrash className="logo" size={25} />
        </div>
        <div id="profileImage" className="myprofileImage">
          {shortName}
        </div>
        <div className="brief-deails">
          <div className="heading-three" id="show-name">
            {showContact.name}
          </div>
          <span id="post-at-company">
            {showContact.designation}@ {showContact.company}
          </span>
        </div>
        <div className="full-deails">
          <table>
            <tbody>
              <tr>
                <td className="font-light">Full Name</td>
                <td id="show-detail-name">{showContact.name}</td>
              </tr>
              <tr>
                <td className="font-light">Email</td>
                <td id="show-email">{showContact.email}</td>
              </tr>
              <tr>
                <td className="font-light">Phone</td>
                <td id="show-phone">{showContact.phone}</td>
              </tr>
              <tr>
                <td className="font-light">Company</td>
                <td id="show-company">{showContact.company}</td>
              </tr>
              <tr>
                <td className="font-light">Designation</td>
                <td id="show-designation">{showContact.designation}</td>
              </tr>
              <tr>
                <td className="font-light">Address</td>
                <td id="show-address">{showContact.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default memo(ContactDetails);

ContactDetails.propTypes = {
  showContact : PropTypes.array,
  handleDelete : propTypes.function,
  handleEdit : propTypes.function
};