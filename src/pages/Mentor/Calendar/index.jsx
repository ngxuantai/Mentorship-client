import {
  Chip,
  Select,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {addDays, startOfWeek} from 'date-fns';
import moment from 'moment';
import {useEffect, useState} from 'react';
// import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router';
import TeachingCalendar from '../../../components/Calendar';
import firebaseInstance from '../../../services/firebase';
import {useUserStore} from '../../../store/userStore';
import {convertTimestamp, getDateAndTime} from '../../../utils/dateConverter';
import {CardEvent} from './components/CardEvent';
import styled from 'styled-components';
import {Label, TextInput, Button, FloatingLabel} from 'flowbite-react';

const Container = styled.div`
  padding: 2rem;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  // width: 90%;
`;

export default function MentorCalendar() {
  const navigate = useNavigate();
  const {user} = useUserStore();
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
    console.log('onChange,', weekList);
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
  console.log('busyTimesOfDay out', events);

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        <Label style={{fontSize: '20px', fontWeight: 'bold'}}>Lịch dạy</Label>
      </div>

      {selectedEvent ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}
        >
          <CardEvent onClick={handleSelectEvent} event={selectedEvent} />
          <TimeUpdateBar
            handleSelectEvent={handleSelectEvent}
            event={selectedEvent}
          />
        </div>
      ) : (
        <BusyTimeManagerBar events={events}></BusyTimeManagerBar>
      )}
      {/* {selectedEvent && (
        <CardEvent onClick={handleSelectEvent} event={selectedEvent} />
      )} */}
      <TeachingCalendar
        selectedEvent={selectedEvent}
        handleSelectEvent={handleSelectEvent}
        events={events}
      ></TeachingCalendar>
    </Container>
  );
}

function BusyTimeManagerBar({events}) {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [busyTimes, setBusyTimes] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState('0');
  const [title, setTitle] = useState('');
  const {user} = useUserStore();
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

      const startOfDay = moment(targetDate).startOf('day');
      const endOfDay = moment(targetDate).endOf('day');

      const busyTimesOfDay = events
        .filter((event) => {
          const eventStart = moment(new Date(event.start));
          return eventStart.isBetween(startOfDay, endOfDay) && event.isBusy;
        })
        .sort((a, b) => a.start - b.start)
        .map((event) => ({
          ...event,
          start: moment(event.start).format('HH:mm'),
          end: moment(event.end).format('HH:mm'),
        }));
      console.log('busyTimesOfDay', events, busyTimesOfDay);
      setBusyTimes(busyTimesOfDay);
    }
  }, [events, dayOfWeek]);

  const handleAddEvent = async () => {
    if (startTime >= endTime) {
      alert('Start time must be less than end time');
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
        alert('New time range overlaps with an existing one');
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
    console.log('Time 1: ', event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
    console.log('Time 2: ', event.target.value);
  };
  const handleDayOfWeekChange = (event) => {
    setDayOfWeek(event.target.value);
  };
  const handleDelete = async (busyTime) => {
    const {id} = busyTime;

    await firebaseInstance.deleteEvent(user.id, dayOfWeek, id);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-between',
        width: '90%',
        padding: '0 1rem',
      }}
    >
      <Label style={{fontWeight: '500', fontSize: '16px'}}>
        Đánh dấu khoảng thời gian bận
      </Label>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1rem 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 500,
            justifyContent: 'space-between',
            marginBottom: 12,
            gap: '1.25rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
            }}
          >
            <TextInput
              type="time"
              id="appt1"
              name="appt1"
              min="09:00"
              max="18:00"
              required
              value={startTime}
              onChange={handleStartTimeChange}
            />
            <TextInput
              type="time"
              id="appt2"
              name="appt2"
              min="09:00"
              max="18:00"
              required
              value={endTime}
              onChange={handleEndTimeChange}
            />
          </div>
          <FormControl
            fullWidth
            size="small"
            style={{
              marginTop: 1,
            }}
          >
            <InputLabel id="demo-simple-select-label">Thứ</InputLabel>
            <Select
              value={dayOfWeek}
              label="Thứ"
              onChange={handleDayOfWeekChange}
            >
              <MenuItem value={0}>Chủ Nhật</MenuItem>
              <MenuItem value={1}>Thứ Hai</MenuItem>
              <MenuItem value={2}>Thứ Ba</MenuItem>
              <MenuItem value={3}>Thứ Tư</MenuItem>
              <MenuItem value={4}>Thứ Năm</MenuItem>
              <MenuItem value={5}>Thứ Sáu</MenuItem>
              <MenuItem value={6}>Thứ Bảy</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={handleAddEvent}
            variant="secondary"
            style={{
              fontWeight: 'bold',
              borderRadius: '4px',
              textAlign: 'center',
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
                style={{fontWeight: 'bold', marginRight: 12}}
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
    </div>
  );
}

function TimeUpdateBar({event, handleSelectEvent}) {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [dayOfWeek, setDayOfWeek] = useState('0');
  const [oldDateOfWeek, setOldDateOfWeek] = useState('0');
  const [title, setTitle] = useState(event.title);
  const {user} = useUserStore();

  const areTimesOneHourApart = (start, end) => {
    const startDate = new Date(`1970-01-01T${start}:00`);
    const endDate = new Date(`1970-01-01T${end}:00`);
    const diffInMinutes = (endDate - startDate) / 1000 / 60;
    return diffInMinutes === 60;
  };

  const handleUpdateEvent = async () => {
    if (startTime >= endTime) {
      alert('Start time must be less than end time');
      return;
    }
    if (!areTimesOneHourApart(startTime, endTime)) {
      alert('Start time and end time must be one hour apart');
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
      isBusy: title === '',
      end: end.getTime(),
    };
    console.log('handleUpdateEvent');
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
    console.log('', event.target.value);
  };
  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
    console.log('Time 2: ', event.target.value);
  };
  const handleDayOfWeekChange = (event) => {
    setDayOfWeek(event.target.value);
  };
  useEffect(() => {
    if (event) {
      const {dayOfWeek, time: sTime} = convertTimestamp(event.start);
      const {time: eTime} = convertTimestamp(event.end);
      setStartTime(sTime);
      setEndTime(eTime);
      setDayOfWeek(dayOfWeek);
      setOldDateOfWeek(dayOfWeek);
    }
  }, [event]);

  return (
    <div
      style={{
        // width: '90%',
        flex: '0.5 5 auto',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          // padding: '1rem 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 500,
            // justifyContent: 'space-between',
            marginBottom: 12,
            gap: '1.25rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
            }}
          >
            <TextInput
              type="time"
              id="appt1"
              name="appt1"
              min="09:00"
              max="18:00"
              required
              value={startTime}
              onChange={handleStartTimeChange}
            />
            <TextInput
              type="time"
              id="appt2"
              name="appt2"
              min="09:00"
              max="18:00"
              required
              value={endTime}
              onChange={handleEndTimeChange}
            />
          </div>
          <FormControl
            fullWidth
            size="small"
            style={{
              marginTop: 1,
              borderRadius: '8px',
            }}
          >
            <InputLabel id="demo-simple-select-label">Thứ</InputLabel>
            <Select
              value={dayOfWeek}
              label="Thứ"
              onChange={handleDayOfWeekChange}
            >
              <MenuItem value={0}>Chủ Nhật</MenuItem>
              <MenuItem value={1}>Thứ Hai</MenuItem>
              <MenuItem value={2}>Thứ Ba</MenuItem>
              <MenuItem value={3}>Thứ Tư</MenuItem>
              <MenuItem value={4}>Thứ Năm</MenuItem>
              <MenuItem value={5}>Thứ Sáu</MenuItem>
              <MenuItem value={6}>Thứ Bảy</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={handleUpdateEvent}
            variant="secondary"
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Lưu
          </Button>
        </div>

        <div>
          <div className=" block">
            <Label htmlFor="email1" value="Tiêu đề" />
          </div>
          <TextInput
            style={{width: 500, marginTop: 12}}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề sự kiện"
          />
        </div>
        {/* <MenteesAvatar></MenteesAvatar>  */}
      </div>
    </div>
  );
}
