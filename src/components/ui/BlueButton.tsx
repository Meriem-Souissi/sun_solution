"use client";

type BlueButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactElement;
  className?: string;
};

const BlueButton = (props: BlueButtonProps) => {
  return (
    <button className={`blue-button ${props.className}`}>
      <span>{props.children}</span>
      {props.icon}
    </button>
  );
};

export default BlueButton;
