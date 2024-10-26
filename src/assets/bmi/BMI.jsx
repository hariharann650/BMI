import React, { useState } from "react";
import "./Bmi.css";
import bmi from "../new patter.svg";

const BMI = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmidata, setBmidata] = useState("");
  const [bmistatus, setBmistatus] = useState(null);
  const [erroring, setError] = useState("");

  const calculate = () => {
    setBmistatus(null);
    const isheight = /^\d+$/.test(height);
    const isweight = /^\d+$/.test(weight);
    if (isheight && isweight) {
      const heightinmeters = height / 100;
      const bmivalue = weight / (heightinmeters * heightinmeters);
      const roundedBmiValue = (bmivalue.toFixed(2));
      setBmidata(roundedBmiValue);

      if (bmivalue <18.5) { 
        setBmistatus("UnderWeight");
      } else if (bmivalue >= 18.5 && bmivalue < 24.9) {
        setBmistatus("Normal");
      } else if (bmivalue >= 25 && bmivalue < 29.9) {
        setBmistatus("OverWeight");
      } else if (bmivalue >= 30 && bmivalue < 34.9) {
        setBmistatus("Obese");
      } else {
        setBmistatus("Extremely Obese");
      }
      setError("");
    } else {
      setError("Please Enter Valid Height and Weight");
      setBmidata(null);
      setBmistatus("");
    }
  };
  const clear = () => {
    setWeight("");
    setHeight("");
    setBmidata("");
    setError("");
    setBmistatus("");
  };

  return (
    <div className="main-div">
      <div className="box">
        <img src={bmi} alt="bmi-image" />
      </div>
      <div className="sub-div">
        <h1>BMI Calculator</h1>
        {erroring && <p className="error">{erroring}</p>}
        <label htmlFor="height">Height (cm):</label>
        <input
          type="text"
          id="height"
          value={height}
          placeholder="Enter the Height"
          onChange={(e) => setHeight(e.target.value)}
        />
        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="text"
          id="weight"
          value={weight}
          placeholder="Enter the Weight"
          onChange={(e) => setWeight(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              calculate();
            }
          }}
        />
        <div className="buttons">
          <button className="bmi-button" onClick={calculate}>
            Calculate BMI
          </button>
          <button className="clear-button" onClick={clear}>
            Clear
          </button>
        </div>
        {bmistatus && (
          <div className="data">
            <div className="bmidata">Your BMI is {bmidata}</div>
            <div className="bmistatus" >Status:<span style={{color : bmistatus == 'UnderWeight' ? '#9b59b6' : bmistatus == 'Normal' ? '#27ae60' :
               bmistatus == 'OverWeight' ? '#f1c40f' : bmistatus == 'Obese' ? '#e67e22' :bmistatus == 'Extremely Obese' ? '#e74c3c' : 'black'}}>{bmistatus}</span></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMI;
