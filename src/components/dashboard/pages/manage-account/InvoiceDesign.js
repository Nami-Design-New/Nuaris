import React, { useState } from "react";
import ThemeCutomization from "../../layout/manage-account/invoice/customizer/ThemeCutomization";
import ContactInfo from "../../layout/manage-account/invoice/customizer/ContactInfo";
import ServiceCutomization from "../../layout/manage-account/invoice/customizer/ServiceCutomization";
import InvoiceNotes from "../../layout/manage-account/invoice/customizer/InvoiceNotes";
import InvoiceLanguage from "../../layout/manage-account/invoice/customizer/InvoiceLanguage";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import invoice from "../../../../assets/images/invoice_preview.svg";
import PreviewInvoiceModal from "../../layout/manage-account/invoice/PreviewInvoiceModal";

const InvoiceDesign = () => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [invoiceDesign, setInvoiceDesign] = useState({
    tempalte: "template1",
    logo_position: "left",
    show_name: true,
    show_email: true,
    show_contact: true,
    show_logo: true,
    show_address: true,
    show_vat: true,
    show_id: true,
    show_product_name: true,
    show_quantity: true,
    show_price: true,
    show_total: true,
    show_discount: true,
    show_after_discount: true,
    show_qr: true,
    cnacellation_policy:
      "Refunds are available up to 14 before the scheduled date.",
    client_notes:
      "Please provide any relevant information or special requests.",
    invoice_language: "En",
  });
  return (
    <div className="invoice_design_wrapper">
      <form className="form-ui">
        <ThemeCutomization
          invoiceDesign={invoiceDesign}
          setInvoiceDesign={setInvoiceDesign}
        />
        <ContactInfo
          invoiceDesign={invoiceDesign}
          setInvoiceDesign={setInvoiceDesign}
        />
        <ServiceCutomization
          invoiceDesign={invoiceDesign}
          setInvoiceDesign={setInvoiceDesign}
        />
        <InvoiceNotes
          invoiceDesign={invoiceDesign}
          setInvoiceDesign={setInvoiceDesign}
        />
        <InvoiceLanguage
          invoiceDesign={invoiceDesign}
          setInvoiceDesign={setInvoiceDesign}
        />
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
        invoiceDesign={invoiceDesign}
        show={showPreviewModal}
        setShow={setShowPreviewModal}
      />
    </div>
  );
};

export default InvoiceDesign;
