import { ProgressBar, Step } from "react-step-progress-bar";
import "../css/multiStepProgressBar.css";

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  const pages = ["pageone", "pagetwo", "pagethree"];
  const percentages = [0, 50, 100];

  var stepPercentage = percentages[pages.indexOf(page)] || 0;
  const getPageLabel = (pageName) => {
    switch (pageName) {
      case "pageone": {
        return "About you";
      }
      case "pagetwo": {
        return "Goal";
      }
      case "pagethree": {
        return "Expectation";
      }
      default:
        return;
    }
  };
  return (
    <ProgressBar percent={stepPercentage}>
      {pages.map((item, index) => (
        <Step key={index}>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              onClick={() => onPageNumberClick((index + 1).toString())}
              style={{
                fontWeight: "bold",
                position: "relative",
                backgroundColor: "gray",
              }}
            >
              {index + 1}
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  marginTop: 8,
                  fontSize: 20,
                  whiteSpace: "nowrap",
                  display: "inline",
                }}
              >
                {getPageLabel(item)}
              </div>
            </div>
          )}
        </Step>
      ))}
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
