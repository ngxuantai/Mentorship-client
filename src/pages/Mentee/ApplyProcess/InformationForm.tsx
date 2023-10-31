import React, { useState } from "react";
import MultiStepProgressBar from "./components/MultiStepProgressBar";
import DashBoard from "../DashBoard/index.jsx";
function App() {
  const [page, setPage] = useState("pageone");

  const nextPage = (page: string) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber: string | number) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      case "4":
        alert("Ooops! Seems like you did not fill the form.");
        break;
      default:
        setPage("1");
    }
  };

  return (
    <div>
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          pageone: <DashBoard onButtonClick={nextPage} />,
          pagetwo: <DashBoard onButtonClick={null} />,
        }[page]
      }
    </div>
  );
}

export default App;
