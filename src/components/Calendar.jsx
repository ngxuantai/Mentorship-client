import {Typography} from '@mui/material';
// import Button from "@mui/material/Button";
import {Button} from 'flowbite-react';
import {Box} from '@mui/system';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Calendar, momentLocalizer, Navigate} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {rrulestr} from 'rrule';

const localizer = momentLocalizer(moment);
const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

export default function TeachingCalendar({
  events,
  selectedEvent: parentSelectedEvent,
  handleSelectEvent: parentHandleSelectEvent,
}) {
  const startOfWeek = moment().startOf('week').toDate();
  startOfWeek.setHours(7, 0, 0);
  const [recuringEvents, setRecuringEvents] = useState(events);

  const handleSelectEvent = parentHandleSelectEvent || ((event) => {});
  useEffect(() => {
    if (events) {
      const data = events.map((e) => createRecurringEvent(e)).flat();
      setRecuringEvents(data);
    }
  }, [events]);
  const createRecurringEvent = (event) => {
    const day = event.start.getDay();
    // Nếu event có trường weeks, sử dụng nó. Ngược lại, sự kiện sẽ kéo dài đến cuối năm hiện tại
    const until = event.weeks
      ? `COUNT=${event.weeks}`
      : `UNTIL=${moment().add(3, 'months').format('YYYYMMDDTHHmmss')}Z`;

    // Tạo chuỗi RRULE
    const rrule = `RRULE:FREQ=WEEKLY;${until};BYDAY=${daysOfWeek[day]}`;

    // Tạo rule từ chuỗi RRULE
    let rule = rrulestr(rrule);

    // Lấy tất cả các ngày mà sự kiện diễn ra
    let dates = rule.all();

    // Tạo một mảng các sự kiện lặp lại
    let recurringEvents = dates.map((date) => ({
      ...event,
      start: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        event.start.getHours(),
        event.start.getMinutes()
      ),
      end: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        event.end.getHours(),
        event.end.getMinutes()
      ),
    }));

    return recurringEvents;
  };
  const handleNavigate = (newDate, view, action) => {
    if (action === 'PREV' && newDate < startOfWeek) {
      return;
    }
  };

  return (
    <div style={{width: 1000, margin: 'auto'}}>
      <Calendar
        selected={parentSelectedEvent}
        localizer={localizer}
        events={recuringEvents}
        startAccessor="start"
        min={startOfWeek}
        defaultView="week"
        onSelectEvent={handleSelectEvent}
        max={new Date(2023, 11, 20, 23, 0)}
        endAccessor="end"
        onNavigate={handleNavigate}
        components={{
          toolbar: CustomToolbar,
        }}
        eventPropGetter={(event) => ({
          style: {
            opacity: event.isBusy ? 0.5 : 1,
            backgroundColor: event.isBusy ? 'gray' : event.color,
            borderColor: event.isBusy ? 'gray' : event.color,
          },
        })}
        style={{height: 500}}
      />
    </div>
  );
}

const CustomToolbar = (props) => {
  const now = moment().startOf('week');

  const navigate = (action) => {
    props.onNavigate(action);
  };
  const viewNames = ['week', 'day', 'agenda'];
  const view = (view) => {
    props.onView(view);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box sx={{display: 'flex', gap: 2}}>
        {/* <Button variant="contained" color="primary" onClick={() => navigate(Navigate.TODAY)}>
          Today
        </Button> */}
        <Button
          color="blue"
          onClick={() => navigate(Navigate.PREVIOUS)}
          disabled={props.date < now}
        >
          Back
        </Button>
        <Button color="blue" onClick={() => navigate(Navigate.NEXT)}>
          Next
        </Button>
      </Box>
      <Typography style={{marginRight: 12, marginLeft: 12}} variant="h6">
        {props.label}
      </Typography>
      <Box sx={{display: 'flex', gap: 2}}>
        {viewNames.map((name) => (
          <Button color="gray" key={name} onClick={() => view(name)}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
