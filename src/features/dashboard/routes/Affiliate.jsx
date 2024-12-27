import { Link } from "react-router-dom";
import PageHeader from "../layout/PageHeader";

export default function Affiliate() {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="create-affiliate" className="button success">
          Create Affiliate Link
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
