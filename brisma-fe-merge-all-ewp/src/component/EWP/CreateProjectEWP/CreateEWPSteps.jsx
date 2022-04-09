import { Steps } from "antd";
import React, { useState } from "react";
import AuditInfo from "./AuditInfo";
import AuditSource from "./AuditSource";
import CreateEWPFinish from "./CreateEWPFinish";
import SelectProject from "./SelectProject";

const { Step } = Steps;

export const CreateEWPSteps = ({ onCancel }) => {
  const [currentStep, setcurrentStep] = useState(0);

  const onNext = () => {
    setcurrentStep(currentStep + 1);
  };

  const onPrev = () => {
    setcurrentStep(currentStep - 1);
  };

  const steps = [
    {
      titte: "Select Audit Source",
      content: <AuditSource onNext={onNext} />,
    },
    {
      titte: "Select Project",
      content: <SelectProject onNext={onNext} onPrev={onPrev} />,
    },
    {
      titte: "Input Project Info",
      content: <AuditInfo onNext={onNext} onPrev={onPrev} />,
    },
    {
      titte: "Finished",
      content: <CreateEWPFinish onCancel={onCancel} />,
    },
  ];

  return (
    <div className="space-y-8">
      <Steps current={currentStep}>
        {steps.map((item, idx) => {
          return <Step key={idx} title={item.titte} />;
        })}
      </Steps>
      <div>{steps[currentStep].content}</div>
    </div>
  );
};
