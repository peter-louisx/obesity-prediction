import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ModelAttributes, { ObesityCategoryType } from "../types/index";
import predict from "../api/api.tsx";
import Card from "./card.tsx";
import SelectField from "./select-field.tsx";
import { Calculator, Loader2Icon } from "lucide-react";

export default function Form() {
  const [result, setResult] = useState<ObesityCategoryType>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const schema = z.object({
    gender: z.enum(["Male", "Female"]),
    age: z.number(),
    height: z.number().min(145).max(198),
    weight: z.number(),
    fcvc: z.number(),
    ncp: z.number(),
    ch2o: z.number(),
    faf: z.number(),
    tue: z.number(),
    caec: z.enum(["Always", "Frequently", "Sometimes", "no"]),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const input: ModelAttributes = {
      gender: data.gender,
      age: data.age,
      height: data.height,
      weight: data.weight,
      fcvc: data.fcvc,
      ncp: data.ncp,
      ch2o: data.ch2o,
      faf: data.faf,
      tue: data.tue,
      caec: data.caec,
    };

    setSubmitLoading(true);

    try {
      const res = await predict(input);
      setResult(res.data.prediction as ObesityCategoryType);
    } catch (error) {
      console.error("Error during prediction:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const removeUnderScore = (str: string) => {
    let newStr = "";

    for (let i = 0; i < str.length; ++i) {
      newStr += str[i] === "_" ? " " : str[i];
    }

    return newStr;
  };

  const processLabel = (str: string) => removeUnderScore(capitalize(str));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const genderOptions = schema.shape.gender._def.values.map((option) => ({
    value: option,
    label: processLabel(option),
  }));
  const caecOptions = schema.shape.caec._def.values.map((option) => ({
    value: option,
    label: processLabel(option),
  }));

  const vegetableConsumptionOptions = [1, 2, 3].map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  const mainMealsFrequencyOptions = [1, 2, 3, 4].map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  const waterDrunkDailyOptions = [1, 2, 3].map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  const physicalActivitiesOptions = [1, 2, 3].map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  const technologyUsageOptions = [0, 1, 2].map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  return (
    <div
      className="bg-gradient-to-br from-gray-50 to-blue-50 h-full pb-12"
      id="form"
    >
      <div className="text-center py-12">
        <div className="main-title">
          <h1 className="text-4xl font-bold">Get Your Health Prediction</h1>
        </div>
        <p className="text-lg text-gray-600 mt-8">
          Please fill out this comprehensive form to assess your obesity risk
          factors. <br />
          All information is{" "}
          <strong>confidential and will not be saved.</strong>{" "}
          <strong>
            Fill with honesty to get the best and most appropriate result.
          </strong>
        </p>
      </div>
      <div>
        <form
          className="px-8 w-full flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card icon="UserCheck" title="General information">
            <p className="mt-2 text-lg text-gray-600">
              General information regarding yourself that helps equating the
              risk and severity of obesity.
            </p>

            {/* Gender */}
            <div className="field">
              <label>Gender:</label>
              <SelectField
                onChange={(selectedOption) => {
                  setValue(
                    "gender",
                    selectedOption?.value as "Male" | "Female"
                  );
                }}
                options={genderOptions}
              />
            </div>

            {/* Age */}
            <div className="field">
              <label className="">Age:</label>
              <input
                {...register("age", { valueAsNumber: true })}
                type="number"
                min={0}
                step={1}
                defaultValue={0}
                style={{
                  border: "1px solid #cbd5e1",
                  padding: "0.8rem",
                }}
                className="border border-blue-400 rounded-md"
              />
            </div>

            {/* Weight */}
            <div className="field">
              <label>Weight (in kg):</label>
              <input
                {...register("weight", { valueAsNumber: true })}
                type="number"
                min={0}
                step={0.01}
                defaultValue={0}
                style={{
                  border: "1px solid #cbd5e1",
                  padding: "0.8rem",
                }}
                className="border border-blue-400 rounded-md"
              />
            </div>

            {/* Height */}

            <div className="field">
              <label>Height (in cm):</label>
              <input
                {...register("height", { valueAsNumber: true })}
                type="number"
                min={145}
                max={198}
                step={0.01}
                defaultValue={145}
                style={{
                  border: "1px solid #cbd5e1",
                  padding: "0.8rem",
                }}
                className="border border-blue-400 rounded-md"
              />
            </div>
          </Card>

          <Card title="Daily Habits" icon="AlarmClock">
            <p className="mt-2 text-lg text-gray-600">
              Daily habits that contributes to the risk and severity of obesity.
            </p>

            {/* Food Between Meals Frequency */}
            <div className="field">
              <label>Do you eat any food between meals?</label>
              <SelectField
                onChange={(selectedOption) => {
                  setValue(
                    "caec",
                    selectedOption?.value as
                      | "Always"
                      | "Frequently"
                      | "Sometimes"
                      | "no"
                  );
                }}
                options={caecOptions}
              />
            </div>

            {/* Vegetables Consumption */}
            <div className="field">
              <label>Do you usually eat vegetables in your meals?</label>
              <SelectField
                onChange={(selectedOption) => {
                  setValue("fcvc", Number(selectedOption?.value));
                }}
                options={vegetableConsumptionOptions}
              />
            </div>

            {/* Main Meals Frequency */}
            <div className="field">
              <label>How many main meals do you have daily?</label>
              <SelectField
                onChange={(selectedOption) => {
                  setValue("ncp", Number(selectedOption?.value));
                }}
                options={mainMealsFrequencyOptions}
              />
            </div>

            {/* Litres of Water drunk daily */}
            <div className="field">
              <label>How much water do you drink daily? (in litres)</label>
              <SelectField
                onChange={(selectedOption) => {
                  setValue("ch2o", Number(selectedOption?.value));
                }}
                options={waterDrunkDailyOptions}
              />
            </div>

            {/* Physical Activity */}
            <div className="field">
              <label>How often do you have physical activity?</label>
              <SelectField
                onChange={(selectedOption) => {
                  console.log("Selected option:", selectedOption);
                  setValue("faf", Number(selectedOption?.value));
                }}
                options={physicalActivitiesOptions}
              />
            </div>

            {/* Technology Usage */}
            <div className="field">
              <label>
                How much time do you use technological devices such as cell
                phone, videogames, television, computer and others?
              </label>
              <SelectField
                onChange={(selectedOption) => {
                  setValue("tue", Number(selectedOption?.value));
                }}
                options={technologyUsageOptions}
              />
            </div>

            <p className="mt-2 text-lg text-center text-gray-600">
              Once all information has been filled, press the button below to
              get your prediction.
            </p>

            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mx-auto mt-5"
              type="submit"
              //print zod errors onclick
              onClick={() => {
                console.log(getValues());
              }}
            >
              {submitLoading && (
                <>
                  <Loader2Icon className="animate-spin h-5 w-5 mr-2" />
                  Calculating...
                </>
              )}

              {!submitLoading && (
                <>
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate Prediction
                </>
              )}
            </button>
          </Card>

          {result && (
            <div className="mt-4 p-6 bg-white rounded-3xl shadow-lg text-center py-8">
              <h2 className="text-4xl font-bold mb-2">Prediction Result</h2>

              <p className="text-lg text-gray-700 mt-4">
                <span className="font-semibold text-2xl text-blue-600">
                  {result}
                </span>
              </p>
              <p className="mt-4 text-gray-600">
                {result === "Insufficient Weight" &&
                  "You are predicted to be underweight. This means your weight is below the healthy range for your height, which may increase the risk of health issues. Consider consulting a healthcare professional for personalized advice."}
                {result === "Normal Weight" &&
                  "You are predicted to have a normal weight. This means your weight is within the healthy range for your height. Continue maintaining a balanced diet and regular physical activity."}
                {result === "Overweight Level I" &&
                  "You are predicted to be overweight (Level I). This means your weight is above the healthy range for your height, which may increase the risk of health problems. Consider adopting healthier eating habits and increasing physical activity."}
                {result === "Overweight Level II" &&
                  "You are predicted to be overweight (Level II). This indicates a higher level of excess weight, which can further increase health risks. It is recommended to consult a healthcare provider for guidance."}
                {result === "Obesity Type I" &&
                  "You are predicted to have Obesity Type I. This means your weight is significantly above the healthy range, increasing the risk of chronic diseases. Professional medical advice and lifestyle changes are strongly recommended."}
                {result === "Obesity Type II" &&
                  "You are predicted to have Obesity Type II. This is a more severe form of obesity, associated with higher health risks. Please consult a healthcare professional for a comprehensive health plan."}
                {result === "Obesity Type III" &&
                  "You are predicted to have Obesity Type III. This is the most severe level of obesity and poses serious health risks. Immediate medical attention and intervention are highly recommended."}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
