import React from "react";

const InvoiceNotes = () => {
  return (
    <div className="bg_white_card">
      <div className="row m-0">
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="cancelation">Cancelation Policy</label>
            <textarea
              name="cancelation"
              id="cancelation"
              placeholder="Write here"
            ></textarea>
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="cancelation">Client Notes</label>
            <textarea
              name="cancelation"
              id="cancelation"
              placeholder="Write here"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceNotes;
