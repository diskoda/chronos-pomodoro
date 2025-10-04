import React from 'react';

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const PenapadProgressStepper: React.FC<ProgressStepperProps> = ({
  currentStep,
  totalSteps,
  className = ''
}) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  const getStepClass = (stepNumber: number) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'pending';
  };

  const getConnectorClass = (stepNumber: number) => {
    return stepNumber < currentStep ? 'completed' : '';
  };

  return (
    <div className={`penaped-progress-stepper ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className={`penaped-step ${getStepClass(step)}`}>
            {getStepClass(step) === 'completed' ? (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M13.5 4.5L6 12L2.5 8.5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              step
            )}
          </div>
          {index < steps.length - 1 && (
            <div className={`penaped-step-connector ${getConnectorClass(step)}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PenapadProgressStepper;