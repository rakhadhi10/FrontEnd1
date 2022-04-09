import React from "react";
import { Steps } from "antd";

const { Step } = Steps;

const JadwalSteps = ({ addendum, currentStep, steps }) => {
  const getCurrentContent = () => {
    const Content = steps[currentStep].content;
    return <Content addendum={addendum} key={steps[currentStep].title} />;
  };

  return (
    <>
      <Steps current={currentStep} labelPlacement="vertical">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="mt-8 px-4 pt-4 bg-white">{getCurrentContent()}</div>
    </>
  );
};

export default JadwalSteps;
