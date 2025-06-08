import { UseFormRegister } from "react-hook-form";
import { ZodSchema } from "zod";

export default interface ModelAttributes {
    gender: "Male" | "Female",
    age: number
    weight: number,
    height: number,
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

export type ObesityCategoryType = "Insufficient Weight" | "Normal Weight" | "Overweight Level I" | "Overweight Level II" | "Obesity Type I" | "Obesity Type II" | "Obesity Type III";

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