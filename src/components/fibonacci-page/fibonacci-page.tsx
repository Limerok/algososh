import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [arr, setArr] = useState<Array<string>>([])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const fibIterative = (n: number) => {
    if (1 <= n && n <= 19) {
      let tempArr: number[] = [0, 1];
      for (let i = 2; i <= n + 1; i++) {
        tempArr.push(tempArr[i - 2] + tempArr[i - 1])
      }
      tempArr.shift()
      setArr(tempArr.map((item) => item.toString()))
    } else {
      return []
    }
  }

  const calculate = () => {
    fibIterative(+input)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.main}>
        <Input type='!text' value={input} onChange={onChange} isLimitText={true} max={19} extraClass={styles.mr} />
        <Button text="Рассчитать" onClick={calculate} />
      </div>
      <div className={styles.letters}>
        {
          arr.map((item, index) =>
            <Circle index={index} letter={item}></Circle>
          )
        }
      </div>
    </SolutionLayout>
  );
};
