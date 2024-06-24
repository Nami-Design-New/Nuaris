import { Route, Routes } from "react-router-dom";
import PageHeader from "../../layout/shared/PageHeader";
import AffiliateMainInfo from "./AffiliateMainInfo";

function CreateAffiliate({ affiliate }) {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name={"Affiliate"} />
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <Routes>
            <Route
              path="/"
              element={<AffiliateMainInfo affiliate={affiliate} />}
            />
            {/* <Route path="/services" element={<AffiliateServices affiliate={affiliate} />} /> */}
          </Routes>
        </div>
      </div>
    </section>
  );
}

export default CreateAffiliate;
