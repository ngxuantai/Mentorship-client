import { ApprovalStatus, PaymentStatus } from "../constants";
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
