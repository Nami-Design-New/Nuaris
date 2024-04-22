import React from "react";
import dummyLogo from "../../../../../assets/images/avatar.png";

const InvoiceTemplate1 = () => {
  return (
    <div className="invoice_template_1">
      <div className="header">
        <div className="logo">
          <div className="img">
            <img src={dummyLogo} alt="logo" />
          </div>
          <div className="company">
            <h6>Amwaj Al Bahar</h6>
            <p>Vat Number : 7584 8747 8485</p>
          </div>
        </div>
        <div className="invoice_data">
          <h6>INVOICE</h6>
          <p>+9960123456789</p>
          <p>email@gmail.com</p>
          <p>Riyadh, Saudi Arabia</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate1;
