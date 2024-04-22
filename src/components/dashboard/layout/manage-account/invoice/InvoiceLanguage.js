import React from "react";

const InvoiceLanguage = () => {
  return (
    <div className="bg_white_card">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="input-field">
            <label htmlFor="language">Invoice assigned languages</label>
            <div className="language_select_grid">
              <label htmlFor="english" className="language_select">
                <input type="radio" name="language" id="english" checked />
                <div className="content">
                  <span>English</span>
                </div>
              </label>
              <label htmlFor="arabic" className="language_select">
                <input type="radio" name="language" id="arabic" />
                <div className="content">
                  <span>العربية</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceLanguage;
