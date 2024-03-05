import React, { useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

const MultipleRangeCalender = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (dates) => {
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
      {selectedDates.map((date, index) => (
        <div key={index}>{DateObject(date).format("YYYY-MM-DD")}</div>
      ))}
    </div>
  );
};

export default MultipleRangeCalender;
