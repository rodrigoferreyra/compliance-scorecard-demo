import './App.css';
import React, { useState } from 'react';

type CalloutAnchor =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface Step {
  title: string;
  description: string;
  image: string;
  callout: {
    anchor: CalloutAnchor;
  };
}

const STEPS: Step[] = [
  {
    title: "Dashboard",
    description: "The Dashboard provides an overview of all your most critical activity across all your different company clients. Highlighted information includes policies, assessments, pending tasks, and risk matrix.",
    image: `${import.meta.env.BASE_URL}images/dashboard.png`,
    callout: { anchor: "center" }
  },
  {
    title: "Choose your client",
    description: "The dropdown menu allows you to switch between different company dashboards.",
    image: `${import.meta.env.BASE_URL}images/select client.png`,
    callout: { anchor: "center" }
  },
  {
    title: "Add Clients",
    description: "Add a new client by opening the Clients page.",
    image: `${import.meta.env.BASE_URL}images/client.gif`,
    callout: { anchor: "top-center" }
  },
  {
    title: "Analytics Trend Chart",
    description: "Visualize live performance vectors, conversion milestones, and rolling active user rates over custom time-series windows.",
    image: `${import.meta.env.BASE_URL}images/Analytics Trend Chart.png`,
    callout: { anchor: "top-left" }
  },
  {
    title: "Actionable Insights & Export",
    description: "Generate customized reports, extract metrics datasets into spreadsheet CSV formats, or trigger system actions.",
    image: `${import.meta.env.BASE_URL}images/Actionable Insights & Export.png`,
    callout: { anchor: "center" }
  }
];

// Helper function to convert anchor to CSS styles
function getCalloutStyle(anchor: CalloutAnchor): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  };

  switch (anchor) {
    case 'top-left': return { ...base, top: '12%', left: '12%' };
    case 'top-center': return { ...base, top: '12%', left: '50%' };
    case 'top-right': return { ...base, top: '12%', right: '12%' };

    case 'center-left': return { ...base, top: '50%', left: '12%' };
    case 'center': return { ...base, top: '50%', left: '50%' };
    case 'center-right': return { ...base, top: '50%', right: '12%' };

    case 'bottom-left': return { ...base, bottom: '12%', left: '12%' };
    case 'bottom-center': return { ...base, bottom: '12%', left: '50%' };
    case 'bottom-right': return { ...base, bottom: '12%', right: '12%' };
  }
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % STEPS.length);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev - 1 + STEPS.length) % STEPS.length);
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const activeStep = STEPS[currentStep];

  return (
    <div className="app-container" id="app-root">
      <header className="header" id="app-header">
        <h1>Compliance Scorecard Demo</h1>
        <p>
          An interactive product demo walkthrough. Use the controls below to navigate through different features of the application dashboard.
        </p>
      </header>

      <div className="screenshot-container" id="demo-screenshot-container">
        <img
          src={activeStep.image}
          alt={activeStep.title}
          className="screenshot-image"
          id="dashboard-screenshot"
          referrerPolicy="no-referrer"
        />

        {/* Floating callout box */}
        <div
          className="callout-box"
          id="step-callout-box"
          style={getCalloutStyle(activeStep.callout.anchor)}
        >
          <div className="step-badge">Step {currentStep + 1} of {STEPS.length}</div>
          <h3>{activeStep.title}</h3>
          <p>{activeStep.description}</p>
        </div>
      </div>

      <div className="navigation-controls" id="demo-nav-controls">
        <div className="dots-container">
          {STEPS.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`dot-indicator ${index === currentStep ? 'active' : ''}`}
              title={`Go to step ${index + 1}`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        <div className="action-area" id="demo-action-area">
          <button
            className="nav-button prev-button"
            onClick={handlePrev}
            id="prev-step-btn"
          >
            Back
          </button>
          <button
            className="nav-button next-button"
            onClick={handleNext}
            id="next-step-btn"
          >
            {currentStep === STEPS.length - 1 ? 'Start Over' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
