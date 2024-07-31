import React from "react";
import { FaAddressBook } from "react-icons/fa";

export default function Header() {
  return (
    <div className="heading">
      <div className="heading-logo">
        <div className="logo">
          <FaAddressBook size={30} />
        </div>
        <div>
          <div className="heading-one">Contacts</div>
          <span>Welcome to the ZURU contact page</span>
        </div>
      </div>
    </div>
  );
}
