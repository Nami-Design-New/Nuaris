import React from "react";
import PageHeader from "../../layout/PageHeader";
import { Link } from "react-router-dom";

const Activities = () => {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="create-activity" className="button success">
          Add New Activity
        </Link>
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card"></div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
