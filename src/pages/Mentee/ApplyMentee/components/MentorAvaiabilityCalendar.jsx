import { Chip } from "@mui/material";
import { addDays, startOfWeek } from "date-fns";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import TeachingCalendar from "../../../../components/Calendar";
import firebaseInstance from "../../../../services/firebase";
import { useUserStore } from "../../../../store/userStore";
import { checkIfEventOverlap } from "../../../../utils/dataHelper";

export default function MentorAvailabilityCalendar({
  values,
  onInputChange,
  plan,
  mentorId,
}) {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [events, setEvents] = useState([]);
  //listen to mentor event change
  const onEventChange = (weekList) => {
    if (!weekList) return;
    const filteredEvents = weekList
      .map((week) => {
        return week.map((e) => {
          return {
            ...e,
            start: new Date(e.start),
            end: new Date(e.end),
            color: "gray",
            title: "",
            isBusy: true,
          };
        });
      })
      .flat();
    setEvents(filteredEvents);
  };
  const handleAddEvent = (event) => {
    setEvents([...events, event]);
    const learningTime = [...values.learningTime, event];
    onInputChange("learningTime", learningTime);
  };
  const handleRemoveEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);

    const updatedMenteeEvents = values.learningTime.filter(
      (event) => event.id !== eventId
    );
    onInputChange("learningTime", updatedMenteeEvents);
  };
  useEffect(() => {
    if (mentorId) {
      const unsubscribe = firebaseInstance.observeCalendarChanges(
        mentorId,
        onEventChange
      );
      return () => unsubscribe();
    }
  }, [mentorId]);
  return (
    <div style={{}}>
      <AddTimeButton
        plan={plan}
        events={events}
        learningTime={values.learningTime}
        addEvent={handleAddEvent}
        removeEvent={handleRemoveEvent}
      ></AddTimeButton>
      <TeachingCalendar events={events}></TeachingCalendar>
    </div>
  );
}

function AddTimeButton({ plan, events, learningTime, removeEvent, addEvent }) {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [dayOfWeek, setDayOfWeek] = useState("0");
  const [title, setTitle] = useState("");
  const { user } = useUserStore();
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

  const areTimesOneHourApart = (start, end) => {
    const startDate = new Date(`1970-01-01T${start}:00`);
    const endDate = new Date(`1970-01-01T${end}:00`);
    const diffInMinutes = (endDate - startDate) / 1000 / 60;
    return diffInMinutes === 60;
  };

  const isStartTimeValid = (start, end) => {
    return start < end;
  };

  const handleAddEvent = async () => {
    if (!areTimesOneHourApart(startTime, endTime)) {
      alert("Start time and end time must be one hour apart");
      return;
    }

    if (!isStartTimeValid(startTime, endTime)) {
      alert("Start time must be less than end time");
      return;
    }

    if (plan.callTimes - learningTime.length <= 0) {
      alert("Bạn đã chọn hết số buổi học của mình");
      return;
    }

    const startOfWeekDate = startOfWeek(new Date());
    const targetDate = addDays(startOfWeekDate, Number(dayOfWeek));
    const start = getDateAndTime(targetDate, startTime);
    const end = getDateAndTime(targetDate, endTime);

    const newEvent = {
      id: Date.now().toString(),
      start,
      title: title,
      weeks: plan.weeks,
      end,
    };
    if (checkIfEventOverlap(events, newEvent)) {
      alert("New time range overlaps with an existing one");
      return;
    }
    addEvent(newEvent);
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
            onClick={handleAddEvent}
            variant="secondary"
            style={{
              fontWeight: "bold",
              borderRadius: "4px",
              textAlign: "center",
              marginRight: 12,
            }}
          >
            Chọn
          </Button>
        </div>
        <div>
          {learningTime.map((menteeEvent, index) => {
            return (
              <Chip
                key={index}
                style={{ fontWeight: "bold", marginRight: 12 }}
                label={`${moment(menteeEvent.start).format("HH:mm")} - ${moment(
                  menteeEvent.end
                ).format("HH:mm")} `}
                onDelete={() => removeEvent(menteeEvent.id)}
              />
            );
          })}
        </div>
      </div>
      <p style={{ fontWeight: "bold", marginLeft: 24 }}>
        Số buổi còn lại {plan.callTimes - learningTime.length}
      </p>
    </>
  );
}
