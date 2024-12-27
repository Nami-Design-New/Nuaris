import { useState } from "react";
import { Form } from "react-bootstrap";
import SelectField from '../../../../ui/form-elements/SelectField';
import InputField from '../../../../ui/form-elements/InputField';


export default function FilterListing() {
  const [advancedFilter, setAdvancedFilter] = useState(false);

  const [filter, setFilter] = useState({
    search: "",
    category: "",
    type: "",
    location: "",
    destination: "",
    marina: "",
    city: "",
    guests: "",
    price_type: "",
  });

  return (
    <div className="top_filter form_ui" data-aos="fade-up">
      <div className="input-field">
        <label htmlFor="search">Search</label>
        <div className="search_group">
          <Form.Control
            className="form-control"
            placeholder="search here..."
            name="search"
            id="search"
            value={filter.search}
          />
          <button className="search_btn">
            <i className="fa-light fa-magnifying-glass"></i>
          </button>
        </div>
      </div>

      <SelectField
        label="Category"
        id="category"
        name="category"
        value={filter.category}
        options={[
          { value: "fleet", name: "Fleets" },
          { value: "activity", name: "Activities" },
          { value: "trip", name: "Trip Packages" },
        ]}
      />
      <SelectField
        label="Type"
        id="type"
        name="type"
        value={filter.type}
        options={[
          { value: "boat", name: "Boats" },
          { value: "mini_boat", name: "Mini Boats" },
          { value: "Yacht", name: "Yachts" },
        ]}
      />
      <SelectField
        label="Location"
        id="location"
        name="location"
        value={filter.location}
        options={[
          { value: "Egypt", name: "Egypt" },
          { value: "Saudi Arabia", name: "Saudi Arabia" },
          { value: "UAE", name: "UAE" },
        ]}
      />

      <button
        className="advanced_search"
        onClick={() => setAdvancedFilter(!advancedFilter)}
      >
        <img src="/images/icons/advanced.svg" alt="advanced" />
        Advanced Search
      </button>

      {advancedFilter && (
        <>
          <SelectField
            label="City"
            id="city"
            name="city"
            value={filter.city}
            options={[
              { value: "cairo", name: "Cairo" },
              { value: "alex", name: "Alex" },
              { value: "giza", name: "Giza" },
            ]}
          />

          <SelectField
            label="Marina"
            id="marina"
            name="marina"
            value={filter.marina}
            options={[
              { value: "marina1", name: "Marina 1" },
              { value: "marina2", name: "Marina 2" },
            ]}
          />

          <SelectField
            label="Destination"
            id="destination"
            name="destination"
            value={filter.destination}
            options={[
              { value: "Egypt", name: "Egypt" },
              { value: "Saudi Arabia", name: "Saudi Arabia" },
              { value: "UAE", name: "UAE" },
            ]}
          />

          <InputField
            label="Number of Guests"
            id="guests"
            name="guests"
            type="number"
            value={filter.guests}
            placeholder="00"
          />

          <SelectField
            label="Destination"
            id="destination"
            name="destination"
            value={filter.destination}
            options={[
              { value: "Egypt", name: "Egypt" },
              { value: "Saudi Arabia", name: "Saudi Arabia" },
              { value: "UAE", name: "UAE" },
            ]}
          />
        </>
      )}
    </div>
  );
}
