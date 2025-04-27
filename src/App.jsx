import { Container, Navbar } from "react-bootstrap";
import "./App.css";
import { Button, TextField } from "@mui/material";
import { use, useState } from "react";

function App() {

  const [desc, setDesc] = useState('')

  const [heightVal, setHeightVal] = useState(0);

  const [weightVal, setWeightVal] = useState(0);

  const [result, setResult] = useState('');

  const [isInvalidHeight, setIsInvalidHeight] = useState(false);

  const [isInvalidWeight, setIsInvalidWeight] = useState(false);

  const validateInp = (event) => {
    const { name, value } = event;

    if (name == "height") {
      setHeightVal(value);
      !!value.match(/^[0-9]*.?[0-9]+$/)
        ? setIsInvalidHeight(false)
        : setIsInvalidHeight(true);
    } else if (name == "weight") {
      setWeightVal(value);
      !!value.match(/^[0-9]*.?[0-9]+$/)
        ? setIsInvalidWeight(false)
        : setIsInvalidWeight(true);
    }
  };

  const onResetClick=()=>{
    setHeightVal(0)
    setIsInvalidHeight(false)
    setWeightVal(0)
    setIsInvalidWeight(false)
    setResult('')
    setDesc('')
  }

  const onCalculateClick=()=>{
    if(heightVal && weightVal){
      const bmi = (weightVal / heightVal ** 2).toFixed(2);
    setResult(bmi);

    const bmiVal = parseFloat(bmi); // parse to number for comparisons

    if (bmiVal < 18.5) {
      setDesc("You are considered underweight.");
    } else if (bmiVal >= 18.5 && bmiVal <= 24.9) {
      setDesc("Congratulations on maintaining a healthy BMI");
    } else if (bmiVal >= 25.0 && bmiVal <= 29.9) {
      setDesc("Your current BMI falls in the overweight range.");
    } else if (bmiVal >= 30) {
      setDesc("Your current BMI falls into the obese range.");
    }
    }
    else{
      alert("please fill the form")
    }
  }

  return (
    <>
    <div className="maindiv container-fluid">
      <Navbar className="nav">
        <Container>
          <Navbar.Brand className="text-center" href="#home">
             BMI Calculator
          </Navbar.Brand>
        </Container>
      </Navbar>


      <div className="second">
        <h2 className="text-center">Let's Calculate BMI</h2>
        <div className="d-flex second-sub">
          <div className="d-flex flex-column m-5 calculator-col">
            <TextField
              onChange={() => {
                validateInp(event.target);
              }}
              id="outlined-basic"
              label="Height"
              variant="outlined"
              className="mb-3"
              name="height"
              value={heightVal || ""}
            />
            {isInvalidHeight ? (
                <div className="text-primary fw-bolder text-center m-2">
                  Please enter a valid digit
                </div>
              ) : (
                ""
              )}
            <TextField
            onChange={() => {
              validateInp(event.target);
            }}
              id="outlined-basic"
              label="Weight"
              variant="outlined"
              className="mb-3"
              name="weight"
              value={weightVal || ""}
            />
            {isInvalidWeight ? (
                <div className="text-primary fw-bolder text-center m-2">
                  Please enter a valid digit
                </div>
              ) : (
                ""
              )}
            <div>
              <Button variant="contained" className="bg-dark me-3" onClick={onCalculateClick} disabled={isInvalidHeight || isInvalidWeight}>
                Calculate
              </Button>
              <Button variant="outlined" className="border-dark text-dark" onClick={onResetClick}>
                Reset
              </Button>
            </div>
          </div>
         
        </div>
        <div className="res-col">
            <div>
              <h2 className="text-center res-h2">Your Result</h2>
            <h5 value={result || ''} className="text-center p-3 bmiresult">{result}</h5>
            <p className="p-2 text-justify bmidescription">{desc}</p>
            </div>
          </div>
      </div>
      </div>
    </>
  );
}

export default App;