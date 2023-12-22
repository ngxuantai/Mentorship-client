import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function TeachingCalendar({ events }) {
  const startOfWeek = moment().startOf("week").toDate();
  startOfWeek.setHours(7, 0, 0);
  return (
    <div style={{}}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        min={startOfWeek}
        max={new Date(2023, 11, 20, 23, 0)}
        endAccessor="end"
        eventPropGetter={(event) => ({
          style: {
            opacity: event.isBusy ? 0.5 : 1,
            backgroundColor: event.isBusy ? "gray" : event.color,
            borderColor: event.isBusy ? "gray" : event.color,
          },
        })}
        style={{ height: 500 }}
      />
    </div>
  );
}
