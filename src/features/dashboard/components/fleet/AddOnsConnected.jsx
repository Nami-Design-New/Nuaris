import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { s3Url } from "../../../../utils/constants";
import AddonModal from "./../../../../ui/modals/AddonModal";
import Pagination from "./../../../../ui/Pagination";
import TableLoader from "./../../../../ui/loaders/TableLoader";
import useGetAddons from "./../../../../hooks/addons/useGetAddons";
import axiosInstance from "../../../../utils/axiosInstance";

const AddOnsConnected = ({ id, createdYachtId }) => {
  const [row, setRow] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { data: addonsList, isLoading, refetch } = useGetAddons();

  const viewRow = (e, rowData) => {
    e.preventDefault();
    setShowModal(true);
    setRow(rowData);
  };

  const connectAddon = async (rowData) => {
    const currentYachtId = id || createdYachtId;
    if (!currentYachtId) return toast.error("Create a yacht first");

    try {
      const isConnected = rowData?.yacht?.id === Number(currentYachtId);
      const action = isConnected ? "disconnect" : "connect";

      const payload = {
        step_id: 1,
        addon_id: rowData.id,
      };

      if (!isConnected) {
        payload.yacht_id = Number(currentYachtId);
      }

      const response = await axiosInstance.post("/addon/create_addon", payload);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          `Addon ${
            action === "connect" ? "Connected" : "Disconnected"
          } successfully`
        );
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="actions_cell_addons">
        <button
          type="button"
          onClick={() => connectAddon(rowData)}
          className={`addon_button ${
            rowData?.yacht?.id === Number(id) ||
            rowData?.yacht?.id === Number(createdYachtId)
              ? "active"
              : ""
          }`}
        >
          {rowData?.yacht?.id === Number(id) ||
          rowData?.yacht?.id === Number(createdYachtId)
            ? "Disconnect"
            : "Connect"}
        </button>
        <Button
          onClick={(e) => viewRow(e, rowData)}
          style={{ boxShadow: "none" }}
        >
          <img src="/images/icons/eye.svg" alt="view" />
        </Button>
      </div>
    );
  };

  const imageTemplate = (item) => {
    return (
      <img
        className="addon"
        src={
          s3Url +
          item?.media?.filter(
            (media) => media?.type === "IMAGE" && media?.is_active
          )?.[0]?.path
        }
        alt="addon"
      />
    );
  };

  return (
    <>
      <div className="fleet_form__wrapper">
        <div className="bg_white_card">
          <div className="row">
            <div className="col-12 p-2">
              <h6 className="form_title">Addons Connected</h6>
            </div>
            <div className="col-12 p-2">
              {isLoading ? (
                <TableLoader />
              ) : (
                <div className="table-container">
                  <DataTable value={addonsList?.data} rows={10}>
                    <Column body={imageTemplate} field="image" header="Image" />
                    <Column field="name" header="Name" />
                    <Column
                      className="d-flex justify-content-end"
                      header="Actions"
                      body={actionTemplate}
                    />
                  </DataTable>
                  {addonsList?.count > 10 && (
                    <Pagination count={addonsList?.count} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {row && (
        <AddonModal
          data={row}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default AddOnsConnected;
