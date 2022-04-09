import { Steps } from "antd";
const { Step } = Steps;

const AnggaranSteps = ({ addendum, currentStep, steps }) => {
  const getCurrentContent = () => {
    const Content = steps[currentStep].content;
    return (
      <Content key={steps[currentStep].title} addendum={addendum} />
    );
  };

  return (
    <>
      <Steps current={currentStep} labelPlacement="vertical">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="p-4 bg-white">{getCurrentContent()}</div>
    </>
  );
};

export default AnggaranSteps;
