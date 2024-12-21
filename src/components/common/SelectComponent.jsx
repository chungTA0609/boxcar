import { useEffect, useRef, useState } from "react";

export default function SelectComponent({
  options = [],
  value,
  onChange,
  isSearch,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery2, setsearchQuery2] = useState("");

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
      onClick={() => setIsDropdownOpen(true)}
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
        {isSearch && (
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="search-field"
            onChange={(e) => setsearchQuery2(e.target.value)}
          />
        )}
        {options
          .filter((elm) => elm.name.toLowerCase().includes(searchQuery2))
          .map((option, index) => (
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
