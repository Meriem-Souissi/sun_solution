import React from "react";

const TruckIcon = () => {
  return (
    <svg
      className="w-6 h-6 text-(--gold-deep)"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <rect x="1" y="7" width="15" height="10" rx="1" />
      <path d="M16 10h3l3 3v4h-6" />
      <circle cx="6" cy="19" r="1.6" />
      <circle cx="18" cy="19" r="1.6" />
    </svg>
  );
};

export default TruckIcon;
