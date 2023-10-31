import React, { useState } from "react";
import MultiStepProgressBar from "./components/MultiStepProgressBar";
import DashBoard from "../DashBoard/index.jsx";
import AboutYouPage from "./components/AboutYouPage";

function ApplyProcess() {
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
      default:
        setPage("1");
    }
  };

  return (
    <div style={{}}>
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          pageone: <AboutYouPage onButtonClick={nextPage} />,
          pagetwo: <DashBoard onButtonClick={null} />,
        }[page]
      }
    </div>
  );
}

export default ApplyProcess;
