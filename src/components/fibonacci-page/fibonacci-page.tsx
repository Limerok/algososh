import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";

export const FibonacciPage: React.FC = () => {
  const [arr, setArr] = useState<Array<string>>([])
  const [buttonPressed, setButtonPressed] = useState<boolean>(false)

  const maxNumber = 19;
  const minNumber = 1;

  const { values, handleChange, setValues } = useForm({
    input: ''
  });

  const getFibonacciNumbers = async (n: number) => {
    setArr([]);
    if (minNumber <= n && n <= maxNumber) {
      let tempArr: number[] = [0, 1];
      setArr(['1'])
      await sleep(SHORT_DELAY_IN_MS);
      for (let i = 2; i <= n + 1; i++) {
        tempArr.push(tempArr[i - 2] + tempArr[i - 1])
        setArr(tempArr.slice(1).map((item) => item.toString()))
        await sleep(SHORT_DELAY_IN_MS);
      }
    }
    setButtonPressed(false)
  }

  const calculate = () => {
    setButtonPressed(true)
    getFibonacciNumbers(+values.input)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.main}>
        <Input
          name='input'
          type='number'
          value={values.input}
          onChange={handleChange}
          isLimitText={true}
          max={maxNumber}
          extraClass={styles.mr}
        />
        <Button
          text="Рассчитать"
          onClick={calculate}
          isLoader={buttonPressed}
          disabled={values.input === '' || !/^\d+$/.test(values.input) || +values.input > 19}
        />
      </div>
      <div className={styles.letters}>
        {arr.map((item, index) => <Circle key={index} index={index} letter={item} />)}
      </div>
    </SolutionLayout>
  );
};