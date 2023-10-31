import React from "react";
import "../css/multiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

type MultiStepProgressBarProps = {
  page: string;
  onPageNumberClick: (pageNumber: string) => void;
};

const MultiStepProgressBar = ({
  page,
  onPageNumberClick,
}: MultiStepProgressBarProps) => {
  const pages = ["pageone", "pagetwo", "pagethree"];
  const percentages = [0, 50, 100];

  var stepPercentage = percentages[pages.indexOf(page)] || 0;
  const getPageLabel = (pageName: string) => {
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
          {({ accomplished }: any) => (
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
