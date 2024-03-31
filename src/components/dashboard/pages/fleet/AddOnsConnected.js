import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import eyeIcon from "../../../../assets/images/eye.svg";
import AddOnModal from "./../../layout/AddOnModal";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axios from "../../../../util/axios";
import TableLoader from "../../../ui/TableLoader";
import CustomPagination from "../../../ui/CustomPagination";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
const AddOnsConnected = () => {
  const yachtId = sessionStorage.getItem("yacht_id");
  const [row, setRow] = useState({});
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const currentPage = searchParams.get("page");
  const [addonsData, setAddonsData] = useState([]);
  const [addonsCount, setAddonsCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;

  useEffect(() => {
    try {
      axios
        .get(`/addons/?sub_user=${subUser}`, {
          params: {
            page: currentPage,
          },
        })
        .then((res) => {
          setAddonsCount(res?.data?.count);
          setAddonsData(res?.data?.results);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, [currentPage, subUser]);

  const viewRow = (e, rowData) => {
    e.preventDefault();
    setShowModal(true);
    setRow(rowData);
  };

  const connectAddon = async (rowData) => {
    try {
      const isConnected = rowData.yacht === yachtId;
      const action = isConnected ? "disconnect" : "connect";

      const response = await axios.patch(`/addons/${rowData?.id}/`, {
        yacht: isConnected ? null : yachtId,
        sub_user: subUser,
      });

      if (response.status === 200) {
        toast.success(
          `Addon ${
            action === "connect" ? "Connected" : "Disconnected"
          } successfully`
        );

        setAddonsData((prevData) => {
          const updatedData = prevData.map((item) => {
            if (item.id === rowData.id) {
              item.yacht = isConnected ? null : yachtId;
            }
            return item;
          });
          return updatedData;
        });
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
          className={`button addon_button ${
            rowData.yacht === yachtId ? "" : "active"
          }`}
        >
          {rowData.yacht === yachtId ? "Disconnect" : "Connect"}
        </button>
        <Button
          onClick={(e) => viewRow(e, rowData)}
          style={{ boxShadow: "none" }}
        >
          <img src={eyeIcon} alt="view" />
        </Button>
      </div>
    );
  };

  const imageTemplate = (item) => {
    return <img className="addon" src={item?.attachments[0]} alt="addon" />;
  };

  return (
    <>
      <div className="fleet_form__wrapper">
        <div className="bg_white_card">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Add ons connected</h6>
            </div>
            <div className="col-12 p-2">
              {loading ? (
                <TableLoader />
              ) : (
                <div className="table-container">
                  <DataTable value={addonsData} rows={10}>
                    <Column body={imageTemplate} field="image" header="Image" />
                    <Column field="name" header="Name" />
                    <Column
                      className="d-flex justify-content-end"
                      header="Actions"
                      body={actionTemplate}
                    />
                  </DataTable>
                  {addonsCount > 0 && <CustomPagination count={addonsCount} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {row && (
        <AddOnModal
          data={row}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default AddOnsConnected;
