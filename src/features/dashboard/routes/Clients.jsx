import { useState } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import PageHeader from "../layout/PageHeader";
import AddClients from "../../../ui/modals/AddClients";
import AddGroup from "../../../ui/modals/AddGroup";

export default function Clients() {
  const [showModal, setShowModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const testData = [
    {
      name: "Client A",
      group: "Group 1",
      vessel_bookings: 5,
      add_ons_bookings: 6,
      location: "Jeddah",
      vessel_booked: "Vessel 1",
    },
  ];

  const actionTemplate = () => {
    return (
      <div className="actions_cell">
        <Button>
          <img src="/images/icons/delete.svg" alt="delete" />
        </Button>

        <Button onClick={() => setShowModal(true)}>
          <img src="/images/icons/edit.svg" alt="edit" />
        </Button>

        <Button>
          <img src="/images/icons/eye.svg" alt="view" />
        </Button>
      </div>
    );
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <button className="button success" onClick={() => setShowModal(true)}>
          Add New Client
        </button>
      </header>

      <div className="row">
        <div className="col-lg-3 col-12 p-2">
          <div className="clients_card">
            <img src="/public/images/icons/clients2.svg" alt="clients" />
            <h4>All clients</h4>
            <h6>2000 Client</h6>
          </div>
        </div>
        <div className="col-lg-3 col-12 p-2">
          <div className="clients_card">
            <img src="/public/images/icons/loyalClients.svg" alt="clients" />
            <h4>Most loyal client</h4>
            <h6>2000 Client</h6>
          </div>
        </div>
        <div className="col-lg-3 col-12 p-2">
          <button
            className="clients_card"
            onClick={() => setShowAddGroupModal(true)}
          >
            <img src="/public/images/icons/addClient.svg" alt="clients" />
            <h4>New Group</h4>
          </button>
        </div>

        <div className="col-12 p-2">
          <div className="inner_card">
            <div className="table-container p-relative">
              <DataTable value={testData}>
                <Column field="name" header="name" />
                <Column field="group" header="group" />
                <Column field="vessel_bookings" header="vessel bookings" />
                <Column field="add_ons_bookings" header="add ons bookings" />
                <Column field="location" header="location" />
                <Column field="vessel_booked" header="vessel booked" />
                <Column body={actionTemplate} header="actions" />
              </DataTable>
            </div>
          </div>
        </div>
      </div>

      <AddClients showModal={showModal} setShowModal={setShowModal} />
      <AddGroup
        showModal={showAddGroupModal}
        setShowModal={setShowAddGroupModal}
      />
    </section>
  );
}
