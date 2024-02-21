import { Link } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import FleetCardsGrid from "../layout/fleet/FleetCardsGrid";

export default function Fleet() {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
        <Link to="add-yacht" className="button success">
          Add a New Yacht/boat
        </Link>
      </header>
      <FleetCardsGrid />
    </section>
  );
}
