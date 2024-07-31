import React from "react";
import { FaAlignLeft, FaHome, FaUsers } from "react-icons/fa";

export default function Sidebar() {
  return (
    <>
      <FaAlignLeft className="logo" size={30} />
      <a href="/">
        <FaHome className="sidebar-icon" size={30} />
      </a>
      <a href="/">
        <div className="active">
          <FaUsers className="sidebar-icon" size={30} />
        </div>
      </a>
    </>
  );
}
