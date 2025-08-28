export default interface FormInputProps {
  label: string;
  type: "range" | "number" | "select" | "radio";
  value: string | number;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: number | string; label: string }[];
  name?: string; // For radio
  onChange: (value: string | number) => void;
}