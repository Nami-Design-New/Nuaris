import React, { useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

const MultipleRangeCalender = () => {
  const [selectedDates, setSelectedDates] = useState([[]]);

  const handleDateChange = (dates) => {
    console.log(dates);
    setSelectedDates(dates);
  };

  return (
    <div>
      <Calendar
        value={selectedDates}
        onChange={handleDateChange}
        multiple
        range
        plugins={[<DatePanel />]}
      />
      {selectedDates.map((date, index) =>
        date.map((d, i) => <p key={i}>{d.format("DD-MM-YYYY")}</p>)
      )}
    </div>
  );
};

export default MultipleRangeCalender;
