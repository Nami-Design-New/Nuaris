import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import inflatableImage from "../../../../assets/images/inflatable.png";
import eyeIcon from "../../../../assets/images/eye.svg";
import AddOnModal from "./../../layout/AddOnModal";
const AddOnsConnected = () => {
  const [showModal, setShowModal] = useState(false);
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "test",
      image: inflatableImage,
      active: true
    },
    {
      id: 2,
      name: "test2",
      image: inflatableImage,
      active: false
    }
  ]);

  // TODO: get table data, then setTableData

  const actionTemplate = (rowData) => {
    return (
      <div className="actions_cell_addons">
        <button
          type="button"
          onClick={() => {
            // TODO: handle connection
            setTableData((prev) =>
              prev.map((e) => ({
                ...e,
                active: e.id === rowData.id ? !e.active : e.active
              }))
            );
          }}
          className={`button addon_button ${rowData.active && "active"}`}
        >
          {rowData.active ? "Connect" : "Disconnect"}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <img src={eyeIcon} alt="visible" width={16} height={16} />
        </button>
      </div>
    );
  };

  const imageTemplate = (item) => {
    return <img className="addon" src={item.image} alt="addon" />;
  };

  return (
    <>
      <div className="fleet_form__wrapper">
        <div className="bg_white_card">
          <form className="form-ui">
            <div className="row m-0">
              <div className="col-12 p-2">
                <h6 className="form_title">Add ons connected</h6>
              </div>
              <div className="col-12 p-2">
                <div className="table-container">
                  <DataTable value={tableData} rows={10}>
                    <Column body={imageTemplate} field="image" header="Image" />
                    <Column field="name" header="Name" />
                    <Column
                      className="d-flex justify-content-end"
                      header="Actions"
                      body={actionTemplate}
                    />
                  </DataTable>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <AddOnModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default AddOnsConnected;
