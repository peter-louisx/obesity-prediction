import Select from "react-select";
import "./../styles/select-field.css";

export default function SelectField({
  options,
}: {
  options: { value: string; label: string }[];
}) {
  return (
    <Select
      options={options}
      className="react-select-container"
      classNamePrefix="react-select"
      styles={{
        container: (base) => ({
          ...base,
          margin: 0,
        }),
        control: (base, state) => ({
          ...base,
          margin: 0,
          fontSize: "1rem",
          minHeight: "40px",
          borderRadius: "0.5rem",
          borderColor: state.isFocused ? "#2563eb" : "#d1d5db",
          boxShadow: state.isFocused ? "0 0 0 1px #2563eb" : "none",
          "&:hover": { borderColor: "#2563eb" },
          alignItems: "center", // Ensure vertical alignment
        }),
        valueContainer: (base) => ({
          ...base,
          padding: "2px 8px", // Less vertical padding
          margin: 0,
        }),
        singleValue: (base) => ({
          ...base,
          lineHeight: "1.5", // Helps vertically align text
        }),
        input: (base) => ({
          ...base,
          margin: 0,
          padding: 0,
        }),
        menu: (base) => ({
          ...base,
          margin: 0,
          borderRadius: "0.5rem",
          zIndex: 10,
        }),
        menuList: (base) => ({
          ...base,
          padding: 0,
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#eff6ff" : "white",
          color: "#111827",
          cursor: "pointer",
          padding: "8px 12px",
        }),
      }}
    />
  );
}
