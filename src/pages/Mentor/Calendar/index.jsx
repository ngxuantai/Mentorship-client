import { Chip, TextField } from "@mui/material";
import { addDays, startOfWeek } from "date-fns";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import TeachingCalendar from "../../../components/Calendar";
import firebaseInstance from "../../../services/firebase";
import { useUserStore } from "../../../store/userStore";
import { convertTimestamp, getDateAndTime } from "../../../utils/dateConverter";
import { CardEvent } from "./components/CardEvent";

export default function MentorCalendar() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const onEventChange = (weekList) => {
    if (!weekList) return;
    const filteredEvents = weekList
      .map((week) => {
        return week.map((e) => {
          return {
            ...e,
            start: new Date(e.start),
            end: new Date(e.end),
          };
        });
      })
      .flat();
    console.log("onChange,", weekList);
    setEvents(() => filteredEvents);
  };

  const handleSelectEvent = (event) => {
    //toggle selected event
    if (event.isBusy) {
      setSelectedEvent(null);
      return;
    }
    const eventFromArray = events.find((e) => e.id === event.id);
    setSelectedEvent((prev) => {
      if (prev && prev.id === eventFromArray.id) {
        return null;
      }
      return eventFromArray;
    });
  };
  useEffect(() => {
    if (user) {
      const unsubscribe = firebaseInstance.observeCalendarChanges(
        user.id,
        onEventChange
      );
      return () => unsubscribe();
    }
  }, [user]);
  console.log("busyTimesOfDay out", events);

  return (
    <div style={{}}>
      <div className="px-4 py-4">
        <h3>Lịch dạy của bạn</h3>
      </div>

      {selectedEvent ? (
        <TimeUpdateBar
          handleSelectEvent={handleSelectEvent}
          event={selectedEvent}
        ></TimeUpdateBar>
      ) : (
        <BusyTimeManagerBar events={events}></BusyTimeManagerBar>
      )}
      {selectedEvent && (
        <CardEvent
          onClick={handleSelectEvent}
          event={selectedEvent}
        ></CardEvent>
      )}
      <TeachingCalendar
        selectedEvent={selectedEvent}
        handleSelectEvent={handleSelectEvent}
        events={events}
      ></TeachingCalendar>
    </div>
  );
}

function BusyTimeManagerBar({ events }) {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [busyTimes, setBusyTimes] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState("0");
  const [title, setTitle] = useState("");
  const { user } = useUserStore();
  // Hàm trợ giúp để lấy ngày và thời gian từ chuỗi

  // Hàm trợ giúp để kiểm tra xem hai khoảng thời gian có chồng chéo nhau không
  const isOverlap = (start1, end1, start2, end2) => {
    return (
      (start1 >= start2 && start1 <= end2) || (end1 >= start2 && end1 <= end2)
    );
  };

  useEffect(() => {
    if (events && events.length > 0) {
      const startOfWeekDate = startOfWeek(new Date());
      const targetDate = addDays(startOfWeekDate, Number(dayOfWeek));

      const startOfDay = moment(targetDate).startOf("day");
      const endOfDay = moment(targetDate).endOf("day");

      const busyTimesOfDay = events
        .filter((event) => {
          const eventStart = moment(new Date(event.start));
          return eventStart.isBetween(startOfDay, endOfDay) && event.isBusy;
        })
        .sort((a, b) => a.start - b.start)
        .map((event) => ({
          ...event,
          start: moment(event.start).format("HH:mm"),
          end: moment(event.end).format("HH:mm"),
        }));
      console.log("busyTimesOfDay", events, busyTimesOfDay);
      setBusyTimes(busyTimesOfDay);
    }
  }, [events, dayOfWeek]);

  const handleAddEvent = async () => {
    if (startTime >= endTime) {
      alert("Start time must be less than end time");
      return;
    }

    const startOfWeekDate = startOfWeek(new Date());
    const targetDate = addDays(startOfWeekDate, Number(dayOfWeek));
    const start = getDateAndTime(targetDate, startTime);
    const end = getDateAndTime(targetDate, endTime);

    for (let i = 0; i < busyTimes.length; i++) {
      const busyStart = getDateAndTime(targetDate, busyTimes[i].start);
      const busyEnd = getDateAndTime(targetDate, busyTimes[i].end);
      if (isOverlap(start, end, busyStart, busyEnd)) {
        alert("New time range overlaps with an existing one");
        return;
      }
    }

    const event = {
      id: Date.now(),
      start: start.getTime(),
      title: title,
      isBusy: true,
      end: end.getTime(),
    };

    await firebaseInstance.addEvent(user.id, dayOfWeek, event);
  };
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
    console.log("Time 1: ", event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
    console.log("Time 2: ", event.target.value);
  };
  const handleDayOfWeekChange = (event) => {
    setDayOfWeek(event.target.value);
  };
  const handleDelete = async (busyTime) => {
    const { id } = busyTime;

    await firebaseInstance.deleteEvent(user.id, dayOfWeek, id);
  };
  return (
    <>
      <p style={{ fontWeight: "500", marginLeft: 24 }}>
        Đánh dấu khoảng thời gian bận
      </p>
      <div
        style={{
          margin: "12px 24px",
          justifyContent: "space-between",
          display: "flex",

          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 500,
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <input
            type="time"
            id="appt1"
            name="appt1"
            min="09:00"
            max="18:00"
            required
            value={startTime}
            onChange={handleStartTimeChange}
          />
          <input
            type="time"
            id="appt2"
            name="appt2"
            min="09:00"
            max="18:00"
            required
            value={endTime}
            onChange={handleEndTimeChange}
          />
          <select value={dayOfWeek} onChange={handleDayOfWeekChange}>
            <option value="0">Chủ Nhật</option>
            <option value="1">Thứ Hai</option>
            <option value="2">Thứ Ba</option>
            <option value="3">Thứ Tư</option>
            <option value="4">Thứ Năm</option>
            <option value="5">Thứ Sáu</option>
            <option value="6">Thứ Bảy</option>
          </select>
          <Button
            onClick={handleAddEvent}
            variant="secondary"
            style={{
              fontWeight: "bold",
              borderRadius: "4px",
              textAlign: "center",
              marginRight: 12,
            }}
          >
            Thêm
          </Button>
        </div>
        <div>
          {busyTimes.map((busyTime, index) => {
            return (
              <Chip
                key={index}
                style={{ fontWeight: "bold", marginRight: 12 }}
                label={`${busyTime.start} - ${busyTime.end}`}
                onDelete={() => handleDelete(busyTime)}
              />
            );
          })}
        </div>
        {/* <TextField
        id="event-title"
        style={{ width: 500, marginTop: 12 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tiêu đề sự kiện (bỏ trống sẽ được đánh dấu là thời gian bận)"
      />

      <MenteesAvatar></MenteesAvatar> */}
      </div>
    </>
  );
}

function TimeUpdateBar({ event, handleSelectEvent }) {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [dayOfWeek, setDayOfWeek] = useState("0");
  const [oldDateOfWeek, setOldDateOfWeek] = useState("0");
  const [title, setTitle] = useState(event.title);
  const { user } = useUserStore();

  const areTimesOneHourApart = (start, end) => {
    const startDate = new Date(`1970-01-01T${start}:00`);
    const endDate = new Date(`1970-01-01T${end}:00`);
    const diffInMinutes = (endDate - startDate) / 1000 / 60;
    return diffInMinutes === 60;
  };

  const handleUpdateEvent = async () => {
    if (startTime >= endTime) {
      alert("Start time must be less than end time");
      return;
    }
    if (!areTimesOneHourApart(startTime, endTime)) {
      alert("Start time and end time must be one hour apart");
      return;
    }
    const startOfWeekDate = startOfWeek(new Date());
    const targetDate = addDays(startOfWeekDate, Number(dayOfWeek));
    const start = getDateAndTime(targetDate, startTime);
    const end = getDateAndTime(targetDate, endTime);

    const updatedEvent = {
      ...event,
      start: start.getTime(),
      title: title,
      isBusy: title === "",
      end: end.getTime(),
    };
    console.log("handleUpdateEvent");
    //TODO update application learning time
    await firebaseInstance.updateEvent(
      user.id,
      oldDateOfWeek,
      dayOfWeek,
      event.id,
      updatedEvent
    );
    handleSelectEvent(event);
  };
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
    console.log("", event.target.value);
  };
  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
    console.log("Time 2: ", event.target.value);
  };
  const handleDayOfWeekChange = (event) => {
    setDayOfWeek(event.target.value);
  };
  useEffect(() => {
    if (event) {
      const { dayOfWeek, time: sTime } = convertTimestamp(event.start);
      const { time: eTime } = convertTimestamp(event.end);
      setStartTime(sTime);
      setEndTime(eTime);
      setDayOfWeek(dayOfWeek);
      setOldDateOfWeek(dayOfWeek);
    }
  }, [event]);

  return (
    <>
      <div
        style={{
          margin: "12px 24px",
          justifyContent: "space-between",
          display: "flex",

          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 500,
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <input
            type="time"
            id="appt1"
            name="appt1"
            min="09:00"
            max="18:00"
            required
            value={startTime}
            onChange={handleStartTimeChange}
          />
          <input
            type="time"
            id="appt2"
            name="appt2"
            min="09:00"
            max="18:00"
            required
            value={endTime}
            onChange={handleEndTimeChange}
          />
          <select value={dayOfWeek} onChange={handleDayOfWeekChange}>
            <option value="0">Chủ Nhật</option>
            <option value="1">Thứ Hai</option>
            <option value="2">Thứ Ba</option>
            <option value="3">Thứ Tư</option>
            <option value="4">Thứ Năm</option>
            <option value="5">Thứ Sáu</option>
            <option value="6">Thứ Bảy</option>
          </select>
          <Button
            onClick={handleUpdateEvent}
            variant="secondary"
            style={{
              fontWeight: "bold",
              borderRadius: "4px",
              textAlign: "center",
              marginRight: 12,
            }}
          >
            Lưu
          </Button>
        </div>
        <TextField
          id="event-title"
          style={{ width: 500, marginTop: 12 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề sự kiện"
        />

        {/* <MenteesAvatar></MenteesAvatar>  */}
      </div>
    </>
  );
}
