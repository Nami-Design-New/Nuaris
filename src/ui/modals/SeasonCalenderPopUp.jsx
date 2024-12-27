import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

function SeasonCalenderPopUp({
  show,
  setShow,
  currentCard,
  formData,
  setFormData,
  index
}) {
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    if (currentCard?.dates?.length > 0) {
      setSelectedDates(
        currentCard.dates.map((e) => [
          new DateObject({
            year: Number(e?.start_date?.split("-")[0]),
            month: Number(e?.start_date?.split("-")[1]),
            day: Number(e?.start_date?.split("-")[2])
          }),
          new DateObject({
            year: Number(e?.end_date?.split("-")[0]),
            month: Number(e?.end_date?.split("-")[1]),
            day: Number(e?.end_date?.split("-")[2])
          })
        ])
      );
    }
  }, [currentCard]);

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    const updatedSeasonPrices = [...formData.season_prices];
    updatedSeasonPrices[index].dates = dates.map((dateRange) => {
      if (dateRange[0] && dateRange[1]) {
        return {
          start_date: dateRange[0].format("YYYY-MM-DD"),
          end_date: dateRange[1].format("YYYY-MM-DD")
        };
      }
      return null;
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      season_prices: updatedSeasonPrices
    }));
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <h6>Select Dates</h6>
      </Modal.Header>
      <Modal.Body className="seasonCalenderPopUp">
        <Calendar
          value={selectedDates}
          onChange={handleDateChange}
          multiple
          range
          plugins={[<DatePanel key="date-panel" />]}
        />
      </Modal.Body>
    </Modal>
  );
}

export default SeasonCalenderPopUp;
