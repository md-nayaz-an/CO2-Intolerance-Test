import { Button, Grid } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import BreathingTimer from "./breathing";

export default function Interaction (props) {
  
  const breathRef = useRef();

  const [buttonState, setButtonState] = useState("Start");
  const [currentState, setCurrentState] = useState("Start");

  const { inhaleExhaleData, setInhaleExhaleData } = props;

  const interval = useRef();

  const timer = useRef(0);

  const [idx, setIdx] = useState(1);

  useEffect(() => {
    //console.log(...inhaleExhaleData);
  }, [inhaleExhaleData]);


  const handleInhaleClick = () => {
    breathRef.current.expand();
    clearInterval(interval.current);

    setIdx((idx) => idx + 1);
    timer.current = 0.0;

    interval.current = setInterval(() => {
      timer.current += 0.1;
      setInhaleExhaleData((data) => [ 
        ...data, 
          {
            index: idx,
            duration: timer.current,
            phase: "inhale",
          }
      ]);
    }, 100);
  };

  const handleExhaleClick = () => {
    breathRef.current.shrink();
    clearInterval(interval.current);

    setIdx((idx) => idx + 1);
    timer.current = 0.0;
    
    interval.current = setInterval(() => {
      timer.current += 0.1;
      setInhaleExhaleData([...inhaleExhaleData, 
        {
          index: idx,
          duration: timer.current,
          phase: "exhale",
        }
      ]);
    }, 100);
  
  };

  const stopTimer = () => {
    breathRef.current.stop();
    setButtonState("Start");
    clearInterval(interval.current);
  }

  const onReset = () => {
    stopTimer();
    setIdx(1);
    setInhaleExhaleData([]);
    setButtonState("Start");
  };

  const handleClick = () => {
    switch(buttonState) {
      case "Start":
        onReset();
        setButtonState("Inhale");
        setCurrentState("Start");
        break;

      case "Inhale":
        setButtonState("Exhale");
        setCurrentState("Inhaling");
        handleInhaleClick();
        break;

      case "Exhale":
        setButtonState("Inhale");
        setCurrentState("Exhaling");
        handleExhaleClick();
        break;
    }
  }

  return(
    <Grid container
    direction="column"
    justifyContent="center"
    alignItems="center"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
    <BreathingTimer
      ref={breathRef}
      currentState={currentState}
    />
    
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
      padding={2}
    >
      <Button
        variant="outlined"
        size="large"
        onClick={onReset}
        >
        Reset
      </Button>

      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        columnGap={1}
        xs={6} md={3}
      >
        {
          (buttonState !== "Start") &&
          <Button
            variant="outlined"
            size="large"
            onClick={stopTimer}
            >
            Stop
          </Button>
        }

        <Button
          variant={(buttonState === "Start") ? "outlined": "contained"}
          size="large"
          onClick={handleClick}
        >
          {buttonState}
        </Button>
      

      </Grid>
    </Grid>
  </Grid>
  )
}