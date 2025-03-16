// import logo from './logo.svg';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import './App.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { z } from 'zod';
import ModelAttributes, { ObesityCategoryType } from './types';
import predict from './api/api.tsx';

function App() {
  const [result, setResult] = useState<ObesityCategoryType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const schema = z.object({
    gender: z.enum(["Male", "Female"]),
    // age: z.number().min(14).max(61),
    age: z.number(),
    // height: z.number().min(145).max(198),
    weight: z.number(),
    // weight: z.number().min(39).max(173),
    family_history: z.enum(['yes', 'no']),
    favc: z.enum(['yes', 'no']),
    fcvc: z.number().refine(num => num in [1, 2, 3]),
    ncp: z.number().refine(num => num in [1, 2, 3, 4]),
    caec: z.enum(['Always', 'Frequently', 'Sometimes', 'no']),
    smoke: z.enum(['yes', 'no']),
    ch2o: z.number().refine(num => num in [1, 2, 3]),
    scc: z.enum(['yes', 'no']),
    faf: z.number().refine(num => num in [1, 2, 3]),
    tue: z.number().refine(num => num in [0, 1, 2]),
    calc: z.enum(['Always', 'Frequently', 'Sometimes', 'no']),
    mtrans: z.enum(['Public_Transportation', 'Automobile', 'Walking', 'Motorbike', 'Bike']),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log("CALLED");
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
  }

  const capitalize = (str: string) => (
    str.charAt(0).toUpperCase() + str.slice(1)
  );

  const removeUnderScore = (str: string) => {
    let newStr = ""

    for (let i = 0; i < str.length; ++i) {
      newStr += str[i] === '_' ? ' ' : str[i];
    }

    return newStr;
  }

  const processLabel = (str: string) => (removeUnderScore(capitalize(str)));

  const {
    register,
    formState: {
      errors,
    },
    watch,
    setValue,
    handleSubmit
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="main-app">
      <h1>
        Obesity Prediction
      </h1>
      <div>
        <form className="main-form" onSubmit={handleSubmit(onSubmit)}>

          {/* Gender */}
          <div className="field">
            <label>Gender:</label>
            <select {...register("gender")}>
              {schema.shape.gender._def.values.map((option, key: number) => (
                <option key={key} value={option}>{processLabel(option)}</option>
              ))}
            </select>
          </div>
          
          {/* Age */}
          <div className="field">
            <label>Age:</label>
            <input {...register("age", {valueAsNumber: true})} type="number" min={0} step={1} defaultValue={0} />
          </div>

          {/* Weight */}
          <div className="field">
            <label>Weight (in kg):</label>
            <input {...register("weight", {valueAsNumber: true})} type="number" min={0} step={0.01} defaultValue={0} />
          </div>

          {/* Family History */}
          <div className="field">
            <label>Obesity in family history?</label>
            <select {...register("family_history")}>
              {schema.shape.family_history._def.values.map((option, key: number) => (
                <option key={key} value={option}>{processLabel(option)}</option>
              ))}
            </select>
          </div>

          {/* High Caloric Food Consumption */}
          <div className="field">
            <label>Do you eat high caloric food frequently?</label>
            <select {...register("favc")}>
              {schema.shape.favc._def.values.map((option, key: number) => (
                <option key={key} value={option}>{processLabel(option)}</option>
              ))}
            </select>
          </div>

          {/* Vegetables  Consumption */}
          <div className="field">
            <label>Do you usually eat vegetables in your meals?</label>
            <select {...register("fcvc", {valueAsNumber: true})}>
              {[1, 2, 3].map((option, key: number) => (
                <option key={key} value={option}>{processLabel(String(option))}</option>
              ))}
            </select>
          </div>

          {/* Main Meals Frequency */}
          <div className="field">
            <label>How many main meals do you have daily?</label>
            <select {...register("ncp", {valueAsNumber: true})}>
              {[1, 2, 3, 4].map((option, key: number) => (
                <option key={key} value={option}>{processLabel(String(option))}</option>
              ))}
            </select>
          </div>

          {/* Main Meals Frequency */}
          <div className="field">
            <label>Do you eat any food between meals?</label>
            <select {...register("caec")}>
              {schema.shape.caec._def.values.map((option, key: number) => (
                <option key={key} value={option}>{processLabel(String(option))}</option>
              ))}
            </select>
          </div>

          {/* Smoke or Not */}
          <div className="field">
            <label>Do you smoke?</label>
            <select {...register("smoke")}>
              {schema.shape.smoke._def.values.map((option, key: number) => (
                <option key={key} value={option}>{processLabel(String(option))}</option>
              ))}
            </select>
          </div>

          {/* Litres of Water drunk daily */}
          <div className="field">
            <label>How much water do you drink daily? (in litres)</label>
            <select {...register("ch2o", {valueAsNumber: true})}>
              {[1, 2, 3].map((option, key: number) => (
                <option key={key} value={option}>{processLabel(String(option))}</option>
              ))}
            </select>
          </div>

          {/* Calories Monitoring */}
          <div className="field">
            <label>Do you monitor the calories you eat daily?</label>
            <select {...register("scc")}>
              {schema.shape.scc._def.values.map((option, key: number) => (
                <option key={key} value={option}>{processLabel(String(option))}</option>
              ))}
            </select>
          </div>

          {/* Physical Activity */}
          <div className="field">
            <label>How often do you have physical activity?</label>
            <select {...register("faf", {valueAsNumber: true})}>
              {[1, 2, 3].map((option, key: number) => (
                <option key={key} value={option}>{processLabel(String(option))}</option>
              ))}
            </select>
          </div>

          {/* Technology Use */}
          <div className="field">
            <label>How much time do you use technological devices such as cell phone, videogames, television, computer and others?</label>
            <select {...register("tue", {valueAsNumber: true})}>
              {[0, 1, 2].map((option, key: number) => (
                <option key={key} value={option}>{processLabel(String(option))}</option>
              ))}
            </select>
          </div>

          {/* Main Meals Frequency */}
          <div className="field">
            <label>How often do you drink alcohol?</label>
            <select {...register("calc")}>
              {schema.shape.calc._def.values.map((option, key: number) => (
                <option key={key} value={option}>{processLabel(String(option))}</option>
              ))}
            </select>
          </div>

          {/* Main Meals Frequency */}
          <div className="field">
            <label>Which transportation do you usually use?</label>
            <select {...register("mtrans")}>
              {schema.shape.mtrans._def.values.map((option, key: number) => (
                <option key={key} value={option}>{processLabel(String(option))}</option>
              ))}
            </select>
          </div>

          <button type="submit"
            onClick={() => {
              console.log(errors);
            }}
          >Submit</button>

        </form>

        {result && (
          <strong>
            <em>{result}</em>
          </strong>
        )}
        
      </div>
    </div>
  );
}

export default App;
