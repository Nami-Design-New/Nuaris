import React, { useState } from "react";
import ThemeCutomization from "../../layout/manage-account/invoice/customizer/ThemeCutomization";
import ContactInfo from "../../layout/manage-account/invoice/customizer/ContactInfo";
import ServiceCutomization from "../../layout/manage-account/invoice/customizer/ServiceCutomization";
import InvoiceLanguage from "../../layout/manage-account/invoice/customizer/InvoiceLanguage";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import invoice from "../../../../assets/images/invoice_preview.svg";
import PreviewInvoiceModal from "../../layout/manage-account/invoice/PreviewInvoiceModal";
import { toast } from "react-toastify";
import axios from "./../../../../util/axios";
import { useSelector } from "react-redux";

const InvoiceDesign = () => {
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [loading, setLoading] = useState(false);
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
    invoice_language: "En"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/invoices/", {
        design: invoiceDesign,
        sub_user: subUser
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Invoice Design Saved Successfully");
        setInvoiceDesign(response.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invoice_design_wrapper">
      <form className="form-ui" onSubmit={handleSubmit}>
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
          <SubmitButton name="Save" loading={loading} />
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
