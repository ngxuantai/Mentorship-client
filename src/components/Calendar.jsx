import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { rrulestr } from "rrule";

let rule = rrulestr("RRULE:FREQ=WEEKLY;UNTIL=20240228T000000Z;BYDAY=MO");

let dates = rule.all();

let recurringEvents = dates.map((date) => ({
  title: "Học tiếng Anh",
  start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0),
  end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0),
}));
const localizer = momentLocalizer(moment);
const myEventsList = [
  ...recurringEvents,
  {
    title: "Học tiếng Anh",
    start: new Date(2023, 11, 20, 10, 0), // tháng bắt đầu từ 0 (0-11)
    end: new Date(2023, 11, 20, 12, 0),
  },
  {
    title: "Họp nhóm dự án",
    start: new Date(2023, 11, 21, 14, 30),
    end: new Date(2023, 11, 21, 16, 30),
  },
  {
    title: "Thi cuối kỳ",
    start: new Date(2023, 11, 22, 8, 0),
    end: new Date(2023, 11, 22, 10, 0),
  },
];

export default function ScheduleCalendar(props) {
  return (
    <div style={{ height: "70%", width: "70%" }}>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
