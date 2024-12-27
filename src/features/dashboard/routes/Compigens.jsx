import { Link } from "react-router-dom";
import PageHeader from "../layout/PageHeader";

export default function Compigens() {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="add-new-compigens" className="button success">
          New campaign
        </Link>
      </header>
      <div className="row">
        <div className="col-12 p-2">
          <div className="inner_card"></div>
        </div>
      </div>
    </section>
  );
}
