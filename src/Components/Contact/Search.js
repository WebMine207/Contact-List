import React, {useState} from "react";
import PropTypes from "prop-types";

export default function Search({
  showModal,
  handleSearch
}) {
  function handleSearchinput(e) {
    var {target: {value}} = e;
    setfilterText(value);
    handleSearch(value);
  }
  const [filterText, setfilterText] = useState(null);
  return (
    <>
      <input
        className=""
        placeholder="Search Contacts"
        name="search"
        id="searchBar"
        value={filterText}
        onChange={handleSearchinput}
      />
      <img src="images/search-icon.png" alt="webmine music search icon" />
      <button
        type="button"
        className="btn-custom"
        onClick={showModal} 
      >
        Add Contact
      </button>
      <button type="button" className="btn-custom d-none" id="removeAllButton">
        Delete Contacts
      </button>
    </>
  );
}
Search.propTypes = {
  text: PropTypes.object,
  showModal : PropTypes.function,
  handleSearch : PropTypes.function
};
