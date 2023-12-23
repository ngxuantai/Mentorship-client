import { useState } from "react";

export default function MenteesAvatar() {
  const [menteeList, setMenteeList] = useState(["A", "B", "C"]);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
      {menteeList.map((mentee, index) => (
        <div
          key={index}
          onClick={() => setSelectedItem(index)}
          style={{ opacity: selectedItem === index ? 1 : 0.5 }}
        >
          <MenteeAvatar>{mentee}</MenteeAvatar>
        </div>
      ))}
    </div>
  );
}

import Avatar from "@mui/material/Avatar";

function MenteeAvatar({ children }) {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const backgroundColor = getRandomColor();

  return (
    <div
      className="button-effect"
      style={{
        borderRadius: "50%",
        padding: 12,
        backgroundColor,
      }}
    >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </div>
  );
}
