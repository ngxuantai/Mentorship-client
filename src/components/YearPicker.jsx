import { MenuItem, Select } from "@mui/material";

export default function YearPicker({ value, onChange }) {
  const years = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => i + 1900
  ).reverse();

  return (
    <Select
      sx={{ alignSeft: "flex-start", width: 200 }}
      value={value}
      onChange={onChange}
    >
      {years.map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  );
}
