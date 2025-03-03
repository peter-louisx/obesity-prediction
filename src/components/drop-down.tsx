import React from "react";
import { ZodSchema } from "zod";
import { DropDownType } from "../types";

export default function DropDown<T extends ZodSchema>({
    register,
    name,
    options,
}: DropDownType<T>) {
    return (
        <select {...register(name as any)}>
            {options.map((option, key: number) => (
                <option key={key} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
}