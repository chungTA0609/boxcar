import { useEffect, useRef, useState } from "react";

export default function SelectComponent({ options = [], value, onChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    // Check if the click was outside the referenced element
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close the dropdown
    }
  };

  useEffect(() => {
    // Add event listener on mount
    document.addEventListener("click", handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`drop-menu ${isDropdownOpen ? "active" : ""}`}
      onClick={() => setIsDropdownOpen((prev) => !prev)}
    >
      <div className="select">
        <span>{value}</span>
        <i className="fa fa-angle-down" />
      </div>

      <ul
        className="dropdown"
        style={
          isDropdownOpen
            ? {
                display: "block",
                opacity: 1,
                visibility: "visible",
                transition: "0.4s",
              }
            : {
                display: "block",
                opacity: 0,
                visibility: "hidden",
                transition: "0.4s",
              }
        }
      >
        {options.map((option, index) => (
          <li
            onClick={(event) => {
              event.stopPropagation(); // Prevent parent click event

              setIsDropdownOpen(false); // Close the dropdown
              onChange(option); // Notify the parent of the selected value
            }}
            key={index}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
