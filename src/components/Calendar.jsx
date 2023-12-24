import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import moment from "moment";
import { Calendar, momentLocalizer, Navigate } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function TeachingCalendar({ events }) {
  const startOfWeek = moment().startOf("week").toDate();
  startOfWeek.setHours(7, 0, 0);

  const handleNavigate = (newDate, view, action) => {
    if (action === "PREV" && newDate < startOfWeek) {
      return;
    }
  };

  return (
    <div style={{ width: 1000 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        min={startOfWeek}
        max={new Date(2023, 11, 20, 23, 0)}
        endAccessor="end"
        onNavigate={handleNavigate}
        components={{
          toolbar: CustomToolbar,
        }}
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

const CustomToolbar = (props) => {
  const now = moment().startOf("week");

  const navigate = (action) => {
    props.onNavigate(action);
  };
  const viewNames = ["week", "day", "agenda"];
  const view = (view) => {
    props.onView(view);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* <Button variant="contained" color="primary" onClick={() => navigate(Navigate.TODAY)}>
          Today
        </Button> */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(Navigate.PREVIOUS)}
          disabled={props.date < now}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(Navigate.NEXT)}
        >
          Next
        </Button>
      </Box>
      <Typography style={{ marginRight: 12, marginLeft: 12 }} variant="h6">
        {props.label}
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {viewNames.map((name) => (
          <Button
            variant="outlined"
            color="primary"
            key={name}
            onClick={() => view(name)}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
