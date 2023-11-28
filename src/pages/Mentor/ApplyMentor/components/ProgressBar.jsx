import React from 'react';
import './css/ProgressBar.css';
import {ProgressBar, Step} from 'react-step-progress-bar';

const MultiStepProgressBar = ({page, onPageNumberClick}) => {
  // const steps = [
  //   {page: 'pageone', percentage: 0},
  //   {page: 'pagetwo', percentage: 50},
  //   {page: 'pagethree', percentage: 100},
  // ];

  var stepPercentage = 0;
  if (page === 'pageone') {
    stepPercentage = 0;
  } else if (page === 'pagetwo') {
    stepPercentage = 50;
  } else if (page === 'pagethree') {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    // <ProgressBar
    //   percent={steps.find((step) => step.page === page)?.percentage || 0}
    // >
    //   {steps.map((step, index) => (
    //     <Step key={index}>
    //       {({accomplished}) => (
    //         <div
    //           className={`indexedStep ${accomplished ? 'accomplished' : null} ${
    //             step.page === page ? 'current' : null
    //           }`}
    //           onClick={() => onPageNumberClick(step.page)}
    //         >
    //           {accomplished ? '✔' : step.page}
    //         </div>
    //       )}
    //     </Step>
    //   ))}
    // </ProgressBar>
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({accomplished, index}) => (
          <div
            className={`indexedStep ${accomplished ? 'accomplished' : null}`}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({accomplished, index}) => (
          <div
            className={`indexedStep ${accomplished ? 'accomplished' : null}`}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({accomplished, index}) => (
          <div
            className={`indexedStep ${accomplished ? 'accomplished' : null}`}
          >
            {index + 1}
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
