"use client";

type BlueButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactElement;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler;
};

const BlueButton = (props: BlueButtonProps) => {
  return (
    <button
      className={`blue-button ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      <span>{props.children}</span>
      {props.icon}
    </button>
  );
};

export default BlueButton;
