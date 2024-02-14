import React from "react";
import { Link } from "react-router-dom";

const PageHeader = ({ name, backLinks, hint }) => {
  return (
    <div className="page_header">
      <h1>{name}</h1>
      <h5>
        {backLinks.map((link, index) => (
          <span key={index}>
            <Link to={link.to}>{link.name}</Link> / {" "}
          </span>
        ))}
        {name} {hint && <small>{hint}</small>}
      </h5>
    </div>
  );
};

export default PageHeader;
