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
}

export type ObesityCategoryType =
  | "Insufficient_Weight"
  | "Normal_Weight"
  | "Overweight_Level_I"
  | "Overweight_Level_II"
  | "Obesity_Type_I"
  | "Obesity_Type_II"
  | "Obesity_Type_III";

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
