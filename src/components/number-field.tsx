import React from "react";
import { ZodSchema } from "zod";
import { NumberFieldType } from "../types";

export default function NumberField<T extends ZodSchema>({
    register,
    name,
    min,
    max,
    step = 1,
}: NumberFieldType<T>) {
    return (
        <input {...register(name as any)} type="number" min={min} max={max} step={step} {...register} />
    );
}