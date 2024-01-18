import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [arr, setArr] = useState<Array<string>>([])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addWord = () => {
    setArr(input.split(''))
    console.log(arr)
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.main}> 
        <Input type='text' value={input} onChange={onChange} isLimitText={true} maxLength={11} extraClass={styles.mr} />
        <Button text="Развернуть" onClick={addWord}/>
      </form>
      <div className={styles.letters}>
        {
          arr.map((item) => 
            <Circle letter={item}></Circle>
          ) 
        }
      </div>
    </SolutionLayout>
  );
};
