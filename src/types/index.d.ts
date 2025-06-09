import { UseFormRegister } from "react-hook-form";
import { ZodSchema } from "zod";

export default interface ModelAttributes {
  age: number;
  height: number;
  weight: number;
  fcvc: number;
  ncp: number;
  ch2o: number;
  faf: number;
  tue: number;
  gender: "Male" | "Female";
  caec: "Always" | "Frequently" | "Sometimes" | "no";
}

export type ObesityCategoryType =
  | "Insufficient Weight"
  | "Normal Weight"
  | "Overweight Level I"
  | "Overweight Level II"
  | "Obesity Type I"
  | "Obesity Type II"
  | "Obesity Type III";

export interface FieldType<T extends ZodSchema> {
  register: UseFormRegister<T>;
  name: string;
}

export interface NumberFieldType<T extends ZodSchema> extends FieldType<T> {
  min?: number;
  max?: number;
  step?: number;
}

export interface DropDownType<T extends ZodSchema> extends FieldType<T> {
  options: { value: string; label: string | number }[];
}
