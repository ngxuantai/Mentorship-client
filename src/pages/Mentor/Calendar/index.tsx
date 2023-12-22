import { Chip, TextField } from "@mui/material";
import { addDays, startOfWeek } from "date-fns";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { rrulestr } from "rrule";
import TeachingCalendar from "../../../components/Calendar";
import firebaseInstance from "../../../services/firebase";
import { useUserStore } from "../../../store/userStore";
import MenteesAvatar from "./components/MenteesAvatar";

let rule = rrulestr("RRULE:FREQ=WEEKLY;UNTIL=20240228T000000Z;BYDAY=MO");

let dates = rule.all();

let recurringEvents = dates.map((date) => ({
  title: "Học tiếng Anh",
  start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0),
  end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0),
}));
const daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
export default function MentorCalendar() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [events, setEvents] = useState([]);
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
    const repeatEvents = filteredEvents
      .map((e) => createRecurringEvent(e))
      .flat();

    setEvents([...repeatEvents, ...filteredEvents]);
  };
  const createRecurringEvent = (event) => {
    const day = event.start.getDay();
    // Nếu event có trường lastingTime, sử dụng nó. Ngược lại, sự kiện sẽ kéo dài đến cuối năm hiện tại
    const until = event.lastingTime
      ? `UNTIL=${moment().endOf("year").format("YYYYMMDDTHHmmss")}Z`
      : `UNTIL=20231231T000000Z`;

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
  useEffect(() => {
    if (user) {
      const unsubscribe = firebaseInstance.observeCalendarChanges(
        user.id,
        onEventChange
      );
      return () => unsubscribe();
    }
  }, [user]);
  return (
    <div style={{ height: 500 }}>
      <div className="px-4 py-4">
        <h3>Lịch dạy của bạn</h3>
      </div>
      <p style={{ fontWeight: "500", marginLeft: 24 }}>
        Đừng quên đánh dấu khoảng thời gian bận trong tuần để tránh xung đột với
        mentee của bạn
      </p>
      <BusyTimeManager events={events}></BusyTimeManager>
      <TeachingCalendar events={events}></TeachingCalendar>
    </div>
  );
}

function BusyTimeManager({ events }) {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [busyTimes, setBusyTimes] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState("0");
  const [title, setTitle] = useState("");
  const { user } = useUserStore();
  console.log("busi busyTimes", events, busyTimes);
  // Hàm trợ giúp để lấy ngày và thời gian từ chuỗi
  const getDateAndTime = (date, time) => {
    const [hours, minutes] = time.split(":");
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      Number(hours),
      Number(minutes)
    );
  };

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
          return eventStart.isBetween(startOfDay, endOfDay);
        })
        .sort((a, b) => a.start - b.start)
        .map((event) => ({
          eventId: event.id,
          start: moment(event.start).format("HH:mm"),
          end: moment(event.end).format("HH:mm"),
        }));

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
      isBusy: title === "",
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
    const { eventId } = busyTime;
    await firebaseInstance.deleteEvent(user.id, dayOfWeek, eventId);
  };
  return (
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
      <TextField
        id="event-title"
        style={{ width: 500, marginTop: 12 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tiêu đề sự kiện (bỏ trống sẽ được đánh dấu là thời gian bận)"
      />

      <MenteesAvatar></MenteesAvatar>
    </div>
  );
}
