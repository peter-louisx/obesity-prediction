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
    family_history: z.enum(["yes", "no"]),
    favc: z.enum(["yes", "no"]),
    fcvc: z.number(),
    ncp: z.number(),
    caec: z.enum(["Always", "Frequently", "Sometimes", "no"]),
    smoke: z.enum(["yes", "no"]),
    ch2o: z.number(),
    scc: z.enum(["yes", "no"]),
    faf: z.number(),
    tue: z.number(),
    calc: z.enum(["Always", "Frequently", "Sometimes", "no"]),
    mtrans: z.enum([
      "Public_Transportation",
      "Automobile",
      "Walking",
      "Motorbike",
      "Bike",
    ]),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const input: ModelAttributes = {
      gender: data.gender,
      age: data.age,
      height: data.height,
      weight: data.weight,
      family_history: data.family_history,
      favc: data.favc,
      fcvc: data.fcvc,
      ncp: data.ncp,
      caec: data.caec,
      smoke: data.smoke,
      ch2o: data.ch2o,
      scc: data.scc,
      faf: data.faf,
      tue: data.tue,
      calc: data.calc,
      mtrans: data.mtrans,
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
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const genderOptions = schema.shape.gender._def.values.map((option) => ({
    value: option,
    label: processLabel(option),
  }));

  const familyHistoryOptions = schema.shape.family_history._def.values.map(
    (option) => ({
      value: option,
      label: processLabel(option),
    })
  );

  const highCaloricFoodConsumptionOptions = schema.shape.favc._def.values.map(
    (option) => ({
      value: option,
      label: processLabel(option),
    })
  );

  const vegetableConsumptionOptions = [1, 2, 3].map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  const mainMealsFrequencyOptions = [1, 2, 3, 4].map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  const foodBetweenMealsOptions = schema.shape.caec._def.values.map(
    (option) => ({
      value: option,
      label: processLabel(option),
    })
  );

  const smokeOptions = schema.shape.smoke._def.values.map((option) => ({
    value: option,
    label: processLabel(option),
  }));

  const waterDrunkDailyOptions = [1, 2, 3].map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  const caloriesMonitoringOptions = schema.shape.scc._def.values.map(
    (option) => ({
      value: option,
      label: processLabel(option),
    })
  );

  const physicalActivitiesOptions = [1, 2, 3].map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  const technologyUsageOptions = [0, 1, 2].map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  const alcoholicDrinkOptions = schema.shape.calc._def.values.map((option) => ({
    value: option,
    label: processLabel(option),
  }));

  const transportationUsageOptions = schema.shape.mtrans._def.values.map(
    (option) => ({
      value: option,
      label: processLabel(option),
    })
  );

  return (
    <div
      className="bg-gradient-to-br from-gray-50 to-blue-50 h-full pb-12"
      id="form"
    >
      <div className="text-center py-12">
        <div className="main-title">
          <h1 className="text-4xl font-bold">Get Your Health Prediction</h1>
        </div>
        <p className="mt-2 text-lg text-gray-600">
          Please fill out this comprehensive form to assess your obesity risk
          factors. All information is confidential.
        </p>
      </div>
      <div>
        <form
          className="px-8 w-full flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card icon="UserCheck" title="General information">
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

            {/* Family History */}
            <div className="field">
              <label>Obesity in family history?</label>
              <SelectField
                onChange={(selectedOption) => {
                  setValue(
                    "family_history",
                    selectedOption?.value as "yes" | "no"
                  );
                }}
                options={familyHistoryOptions}
              />
            </div>
          </Card>

          <Card title="Daily Habits" icon="AlarmClock">
            {/* High Caloric Food Consumption */}
            <div className="field">
              <label>Do you eat high caloric food frequently?</label>
              <SelectField
                onChange={(selectedOption) => {
                  setValue("favc", selectedOption?.value as "yes" | "no");
                }}
                options={highCaloricFoodConsumptionOptions}
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

            {/* Food Between Meals */}
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
                options={foodBetweenMealsOptions}
              />
            </div>

            {/* Smoke or Not */}
            <div className="field">
              <label>Do you smoke?</label>
              <SelectField
                onChange={(selectedOption) => {
                  setValue("smoke", selectedOption?.value as "yes" | "no");
                }}
                options={smokeOptions}
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

            {/* Calories Monitoring */}
            <div className="field">
              <label>Do you monitor the calories you eat daily?</label>
              <SelectField
                onChange={(selectedOption) => {
                  setValue("scc", selectedOption?.value as "yes" | "no");
                }}
                options={caloriesMonitoringOptions}
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

            {/* Alcoholic Drink */}
            <div className="field">
              <label>How often do you drink alcohol?</label>
              <SelectField
                onChange={(selectedOption) => {
                  setValue(
                    "calc",
                    selectedOption?.value as
                      | "Always"
                      | "Frequently"
                      | "Sometimes"
                      | "no"
                  );
                }}
                options={alcoholicDrinkOptions}
              />
            </div>

            {/* Transportation Usage */}
            <div className="field">
              <label>What is your main means of transportation?</label>
              <SelectField
                onChange={(selectedOption) => {
                  setValue(
                    "mtrans",
                    selectedOption?.value as
                      | "Public_Transportation"
                      | "Automobile"
                      | "Walking"
                      | "Motorbike"
                      | "Bike"
                  );
                }}
                options={transportationUsageOptions}
              />
            </div>

            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mx-auto mt-5"
              type="submit"
              //print zod errors onclick
              onClick={() => {
                if (!Object.keys(schema.safeParse({})).length) {
                  //print errors
                  console.error(
                    "Form validation errors:",
                    schema.safeParse({}).error
                  );
                }
                console.log("Form submitted with data:", errors);
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
