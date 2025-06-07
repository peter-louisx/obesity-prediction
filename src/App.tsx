import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./styles/App.css";
import { z } from "zod";
import ModelAttributes, { ObesityCategoryType } from "./types";
import predict from "./api/api.tsx";
import { HeartPulse } from "lucide-react";
import Card from "./components/card.tsx";
import SelectField from "./components/select-field.tsx";

function App() {
  const [result, setResult] = useState<ObesityCategoryType>();

  const schema = z.object({
    gender: z.enum(["Male", "Female"]),
    // age: z.number().min(14).max(61),
    age: z.number(),
    // height: z.number().min(145).max(198),
    weight: z.number(),
    // weight: z.number().min(39).max(173),
    family_history: z.enum(["yes", "no"]),
    favc: z.enum(["yes", "no"]),
    fcvc: z.number().refine((num) => num in [1, 2, 3]),
    ncp: z.number().refine((num) => num in [1, 2, 3, 4]),
    caec: z.enum(["Always", "Frequently", "Sometimes", "no"]),
    smoke: z.enum(["yes", "no"]),
    ch2o: z.number().refine((num) => num in [1, 2, 3]),
    scc: z.enum(["yes", "no"]),
    faf: z.number().refine((num) => num in [1, 2, 3]),
    tue: z.number().refine((num) => num in [0, 1, 2]),
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

    const res = await predict(input);
    console.log(res);
    setResult(res.data);
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

  const { register, handleSubmit, control } = useForm<z.infer<typeof schema>>({
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
    <div className="main-app">
      <Card>
        <div className="title-container">
          <div className="main-title">
            <HeartPulse className="title-icon" />
            <h1 className="title">Obesity Prediction</h1>
          </div>
          <p className="title-desc">
            Please fill out this comprehensive form to assess your obesity risk
            factors. All information is confidential.
          </p>
        </div>
      </Card>
      <div>
        <form className="main-form" onSubmit={handleSubmit(onSubmit)}>
          <Card icon="UserCheck" title="General information">
            {/* Gender */}
            <div className="field">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <>
                    <label>Gender:</label>
                    <SelectField options={genderOptions} />
                  </>
                )}
              />
            </div>

            {/* Age */}
            <div className="field">
              <label>Age:</label>
              <input
                {...register("age", { valueAsNumber: true })}
                type="number"
                min={0}
                step={1}
                defaultValue={0}
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
              />
            </div>

            {/* Family History */}
            <div className="field">
              <Controller
                name="family_history"
                control={control}
                render={({ field }) => (
                  <>
                    <label>Obesity in family history?</label>
                    <SelectField options={familyHistoryOptions} />
                  </>
                )}
              />
            </div>
          </Card>

          <Card title="Daily Habits" icon="AlarmClock">
            {/* High Caloric Food Consumption */}
            <div className="field">
              <Controller
                name="favc"
                control={control}
                render={({ field }) => (
                  <>
                    <label>Do you eat high caloric food frequently?</label>
                    <SelectField options={highCaloricFoodConsumptionOptions} />
                  </>
                )}
              />
            </div>

            {/* Vegetables  Consumption */}
            <div className="field">
              <Controller
                name="fcvc"
                control={control}
                render={({ field }) => (
                  <>
                    <label>Do you usually eat vegetables in your meals?</label>
                    <SelectField options={vegetableConsumptionOptions} />
                  </>
                )}
              />
            </div>

            {/* Main Meals Frequency */}
            <div className="field">
              <Controller
                name="ncp"
                control={control}
                render={({ field }) => (
                  <>
                    <label>How many main meals do you have daily?</label>
                    <SelectField options={mainMealsFrequencyOptions} />
                  </>
                )}
              />
            </div>

            {/* Food Between Meals */}
            <div className="field">
              <Controller
                name="caec"
                control={control}
                render={({ field }) => (
                  <>
                    <label>Do you eat any food between meals?</label>
                    <SelectField options={foodBetweenMealsOptions} />
                  </>
                )}
              />
            </div>

            {/* Smoke or Not */}
            <div className="field">
              <Controller
                name="smoke"
                control={control}
                render={({ field }) => (
                  <>
                    <label>Do you smoke?</label>
                    <SelectField options={smokeOptions} />
                  </>
                )}
              />
            </div>

            {/* Litres of Water drunk daily */}
            <div className="field">
              <Controller
                name="ch2o"
                control={control}
                render={({ field }) => (
                  <>
                    <label>
                      How much water do you drink daily? (in litres)
                    </label>
                    <SelectField options={waterDrunkDailyOptions} />
                  </>
                )}
              />
            </div>

            {/* Calories Monitoring */}
            <div className="field">
              <Controller
                name="scc"
                control={control}
                render={({ field }) => (
                  <>
                    <label>Do you monitor the calories you eat daily?</label>
                    <SelectField options={caloriesMonitoringOptions} />
                  </>
                )}
              />
            </div>

            {/* Physical Activity */}
            <div className="field">
              <Controller
                name="faf"
                control={control}
                render={({ field }) => (
                  <>
                    <label>How often do you have physical activity?</label>
                    <SelectField options={physicalActivitiesOptions} />
                  </>
                )}
              />
            </div>

            {/* Technology Usage */}
            <div className="field">
              <Controller
                name="tue"
                control={control}
                render={({ field }) => (
                  <>
                    <label>
                      How much time do you use technological devices such as
                      cell phone, videogames, television, computer and others?
                    </label>
                    <SelectField options={technologyUsageOptions} />
                  </>
                )}
              />
            </div>

            {/* Alcoholic Drink */}
            <div className="field">
              <Controller
                name="calc"
                control={control}
                render={({ field }) => (
                  <>
                    <label>How often do you drink alcohol?</label>
                    <SelectField options={alcoholicDrinkOptions} />
                  </>
                )}
              />
            </div>

            {/* Transportation Usage */}
            <div className="field">
              <Controller
                name="mtrans"
                control={control}
                render={({ field }) => (
                  <>
                    <label>How often do you drink alcohol?</label>
                    <SelectField options={transportationUsageOptions} />
                  </>
                )}
              />
            </div>
          </Card>

          <Card>
            <button className="button" type="submit">
              Submit
            </button>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default App;
