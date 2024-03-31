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
const AddOnsConnected = () => {
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

  const actionTemplate = (rowData) => {
    return (
      <div className="actions_cell_addons">
        <button
          type="button"
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
    return <img className="addon" src={item?.attachments[0]} alt="addon" />;
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
                {loading ? (
                  <TableLoader />
                ) : (
                  <div className="table-container">
                    <DataTable value={addonsData} rows={10}>
                      <Column
                        body={imageTemplate}
                        field="image"
                        header="Image"
                      />
                      <Column field="name" header="Name" />
                      <Column
                        className="d-flex justify-content-end"
                        header="Actions"
                        body={actionTemplate}
                      />
                    </DataTable>
                    {addonsCount > 0 && (
                      <CustomPagination count={addonsCount} />
                    )}
                  </div>
                )}
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
