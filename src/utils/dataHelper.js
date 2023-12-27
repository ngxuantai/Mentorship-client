import { addDays, addHours, addMinutes, startOfWeek } from "date-fns";
import { ApprovalStatus, PaymentStatus, PlanType } from "../constants";
export function isEmptyObject(obj) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
}

export const transformApplicationData = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));
  }

  return {
    ...data,
    createdAt: new Date(data.createdAt),
  };
};

export const shortenId = (id) => {
  const maxLength = 6;
  if (id.length > maxLength) {
    return `${id.substring(0, maxLength)}...`;
  }
  return id;
};

export const handleCopyClick = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    console.log("text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

export const mappingApplicationStatus = (status) => {
  switch (status) {
    case ApprovalStatus.PENDING:
      return "Đang chờ";
    case ApprovalStatus.APPROVED:
      return "Chấp thuận";
    case ApprovalStatus.APPROVED:
      return "Từ chối";
    default:
      return null;
  }
};
export const mappingPaymentStatus = (status) => {
  switch (status) {
    case PaymentStatus.FAILED:
      return "Thất bại";
    case PaymentStatus.SUCCEDDED:
      return "Thành công";
    default:
      return null;
  }
};
export const mappingPlanName = (planName) => {
  switch (planName) {
    case PlanType.LITE:
      return "Lite";
    case PlanType.STANDARD:
      return "Standard";
    case PlanType.PRO:
      return "Pro";
    default:
      return "";
  }
};

// Hàm trợ giúp để kiểm tra xem hai khoảng thời gian có chồng chéo nhau không
const isOverlap = (newStart, newEnd, eventStart, eventEnd) => {
  return (
    (newStart >= eventStart && newStart < eventEnd) ||
    (newEnd > eventStart && newEnd <= eventEnd) ||
    (newStart <= eventStart && newEnd >= eventEnd)
  );
};

export const checkIfEventOverlap = (events, newEvent) => {
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    //start and end when mentor create (in the past)
    // Sun Dec 17 2023 18:00:00
    const { start, end } = event;
    //the same start and end but in current week
    // => Sun Dec 24 2023 18:00:00
    const startOfWeekDate = startOfWeek(new Date());
    const wStart = addDays(
      addHours(
        addMinutes(startOfWeekDate, start.getMinutes()),
        start.getHours()
      ),
      start.getDay()
    );
    const wEnd = addDays(
      addHours(addMinutes(startOfWeekDate, end.getMinutes()), end.getHours()),
      end.getDay()
    );

    if (isOverlap(newEvent.start, newEvent.end, wStart, wEnd)) {
      return true;
    }
  }
  return false;
};
export const checkAndRemoveExpiredEvents = (weekList) => {
  const now = new Date().getTime();
  
  return weekList.map((week) =>
    week.filter((event) => {
      // Kiểm tra xem sự kiện có thuộc tính 'weeks' hay không
      if (event.weeks) {
        // Tính thời gian kết thúc dự kiến của sự kiện
        const eventEndTime =
          new Date(event.start).getTime() +
          event.weeks * 7 * 24 * 60 * 60 * 1000;
        // Nếu sự kiện đã hết hạn, loại bỏ nó
        if (now > eventEndTime) {
          return false;
        }
      }
      // Giữ lại sự kiện nếu nó chưa hết hạn
      return true;
    })
  );
};
export const isApplicationExpired = (application) => {
  // Lấy ngày hiện tại
  const currentDate = new Date();

  // Tính ngày kết thúc dự kiến
  const applicationEndDate = new Date(application.applicationDate);
  applicationEndDate.setDate(
    applicationEndDate.getDate() + application.plan.weeks * 7
  );

  // So sánh ngày hiện tại với ngày kết thúc dự kiến
  return currentDate > applicationEndDate;
};
