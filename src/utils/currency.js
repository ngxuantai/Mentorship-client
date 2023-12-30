const formatCurrency = (value) => {
  const options = { style: "currency", currency: "VND" };
  return value.toLocaleString("vi-VN", options);
};

export default formatCurrency;
