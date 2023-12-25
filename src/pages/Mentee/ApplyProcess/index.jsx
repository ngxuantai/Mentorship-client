import { useState } from "react";
import DashBoard from "../DashBoard/index.jsx";
import AboutYouPage from "./components/AboutYouPage";
import MultiStepProgressBar from "./components/MultiStepProgressBar";

function ApplyProcess() {
  const [page, setPage] = useState("pageone");

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
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
