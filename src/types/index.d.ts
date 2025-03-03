import { UseFormRegister } from "react-hook-form";
import { ZodSchema } from "zod";

export default interface ModelAttributes {
    gender: "Male" | "Female",
    age: number
    weight: number,
    family_history: "yes" | "no",
    favc: "yes" | "no",
    fcvc: number,
    ncp: number,
    caec: "Always" | "Frequently" | "Sometimes" | "no",
    smoke: "yes" | "no",
    ch2o: number,
    scc: "yes" | "no",
    faf: number,
    tue: number,
    calc: "Always" | "Frequently" | "Sometimes" | "no",
    mtrans: "Public_Transportation" | "Automobile" | "Walking" | "Motorbike" | "Bike",
}

export type ObesityCategoryType = "Insufficient_Weight" | "Normal_Weight" | "Overweight_Level_I" | "Overweight_Level_II" | "Obesity_Type_I" | "Obesity_Type_II" | "Obesity_Type_III";

export interface FieldType<T extends ZodSchema> {
    register: UseFormRegister<T>;
    name: string;
}

export interface NumberFieldType<T extends ZodSchema>
    extends FieldType<T> {
        min?: number;
        max?: number;
        step?: number;
    }

export interface DropDownType<T extends ZodSchema>
    extends FieldType<T> {
        options: { value: string; label: string | number }[];
    }