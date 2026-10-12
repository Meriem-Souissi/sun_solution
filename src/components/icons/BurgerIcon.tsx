import React from "react";

type BurgerIconProps = {
  menuOpen: any;
};

const BurgerIcon = (props: BurgerIconProps) => {
  return (
    <svg
      className="burger-icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line
        className={`transform-box-fill-box origin-center transition-transform duration-250 ease-in-out ${props.menuOpen ? "translate-y-1.25 rotate-45 transition-[top_0.15s_ease,transform_0.25s_ease_0.1s]" : ""}`}
        x1="4"
        y1="6"
        x2="20"
        y2="6"
      />
      <line
        className={`transform-box-fill-box origin-center transition-transform duration-250 ease-in-out ${props.menuOpen ? "opacity-0" : ""}`}
        x1="4"
        y1="12"
        x2="20"
        y2="12"
      />
      <line
        className={`transform-box-fill-box origin-center transition-transform duration-250 ease-in-out ${props.menuOpen ? "-translate-y-1.25 -rotate-45 transition-[top_0.15s_ease,transform_0.25s_ease_0.1s]" : ""}`}
        x1="4"
        y1="18"
        x2="20"
        y2="18"
      />
    </svg>
  );
};

export default BurgerIcon;
