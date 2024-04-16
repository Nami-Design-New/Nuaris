import React from "react";
import { NavLink } from "react-router-dom";
import profileIcon from "../../../../assets/images/profile.svg";
import inovice from "../../../../assets/images/inovice.svg";
import langage from "../../../../assets/images/langauge.svg";
import walletSettings from "../../../../assets/images/wallet-settings.svg";
import payment from "../../../../assets/images/payment.svg";
import { Accordion } from "react-bootstrap";

const SideBar = () => {
  return (
    <aside className="manage_account_side_bar">
      <ul className="navigation_menu">
        <li className="nav_item">
          <NavLink end to="">
            <div className="icon" style={{ background: "#FFE5D0" }}>
              <img src={profileIcon} alt="profile info" />
            </div>
            Profile info
          </NavLink>
        </li>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="icon" style={{ background: "#CFE2FF" }}>
                <img src={walletSettings} alt="invoice" />
              </div>
              <div className="d-flex flex-column">
                <h6>Nuaris Invoices & Wallet Setting</h6>
                <span>(coming soon)</span>
              </div>
            </Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="icon" style={{ background: "#CFE2FF" }}>
                <img src={payment} alt="invoice" />
              </div>
              <div className="d-flex flex-column">
                <h6>Payments and Company VAT</h6>
                <span>(coming soon)</span>
              </div>
            </Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <li className="nav_item">
          <NavLink end to="/inovice-design-settings">
            <div className="icon" style={{ background: "#F8D7DA" }}>
              <img src={inovice} alt="inovice design settings" />
            </div>
            Invoice Design Settings
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink end to="/language-settings">
            <div className="icon" style={{ background: "#D1E7DD" }}>
              <img src={langage} alt="Language settings" />
            </div>
            Language settings
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
