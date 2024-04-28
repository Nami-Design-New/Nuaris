import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

const SchedulingCalender = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[
        {
          title: `#445 - mahmoud gamal`,
          start: "2024-03-31",
          end: "2024-04-05"
        },
        { title: `#444 - mahmoud gamal`, start: "2024-04-25" },
        { title: `#434 - mahmoud gamal`, start: "2024-04-27" }
      ]}
      editable={true}
      eventDrop={(event) => {
        console.log("Event dropped:", event);
      }}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
      }}
      buttonText={{
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        list: "List"
      }}
    />
  );
};

export default SchedulingCalender;
