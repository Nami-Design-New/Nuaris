import React, { useState } from "react";
import ThemeCutomization from "../../layout/manage-account/invoice/ThemeCutomization";
import ContactInfo from "../../layout/manage-account/invoice/ContactInfo";
import ServiceCutomization from "../../layout/manage-account/invoice/ServiceCutomization";
import InvoiceNotes from "../../layout/manage-account/invoice/InvoiceNotes";
import InvoiceLanguage from "../../layout/manage-account/invoice/InvoiceLanguage";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import invoice from "../../../../assets/images/invoice_preview.svg";
import PreviewInvoiceModal from "../../layout/manage-account/invoice/PreviewInvoiceModal";

const InvoiceDesign = () => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  return (
    <div className="invoice_design_wrapper">
      <form className="form-ui">
        <ThemeCutomization />
        <ContactInfo />
        <ServiceCutomization />
        <InvoiceNotes />
        <InvoiceLanguage />
        <div className="buttons">
          <button
            className="preview_modal"
            onClick={(e) => {
              e.preventDefault();
              setShowPreviewModal(true);
            }}
          >
            <img src={invoice} alt="invoice" />
            Invoice Preview
          </button>
          <SubmitButton name="Save" />
        </div>
      </form>
      <PreviewInvoiceModal
        show={showPreviewModal}
        setShow={setShowPreviewModal}
      />
    </div>
  );
};

export default InvoiceDesign;
