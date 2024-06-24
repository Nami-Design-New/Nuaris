import { useParams } from "react-router-dom";
import PageHeader from "../../layout/shared/PageHeader";
import NewCompigensForm from "./NewCompigensForm";

function AddNewCompigens() {
  const { id } = useParams();
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader
          name={id ? "Edit Compigens" : "Add New compigens"}
          removeLast={id ? true : false}
        />
      </header>
      <div className="row m-0">
        <div className="addon_form_wrapper">
          <div className="">
            <NewCompigensForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddNewCompigens;
