import { useState } from "react";
import * as classes from "./Counter.module.scss";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className={classes.container}>
      <h1>{count}</h1>
      <button onClick={increment} className={classes.btn}>
        increment
      </button>
    </div>
  );
};

export default Counter;
