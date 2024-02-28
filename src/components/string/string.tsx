import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { sleep, swap } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [arr, setArr] = useState<Array<{ value: string, id: number, state: ElementStates }>>([])
  const [buttonPressed, setButtonPressed] = useState<boolean>(false)
  let isFirstCall = useRef(true);

  const maxLength = 11;

  const { values, handleChange, setValues } = useForm({
    input: ''
  });

  const addWord = () => {
    setButtonPressed(true)
    isFirstCall.current = true
    setArr(values.input.split('').map((letter, index) => {
      return { id: index + 1, value: letter, state: ElementStates.Default }
    }))
  }

  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false
      reverseWord()
    }
  }, [arr])

  const reverseWord = async () => {
    let tempArr = arr;
    let start = 0;
    let end = tempArr.length - 1
    while (start < end) {
      tempArr[start].state = ElementStates.Changing
      tempArr[end].state = ElementStates.Changing
      setArr([...tempArr]);
      await sleep(SHORT_DELAY_IN_MS);
      swap(tempArr, start, end)
      tempArr[start].state = ElementStates.Modified
      tempArr[end].state = ElementStates.Modified
      start++;
      end--;
      await sleep(SHORT_DELAY_IN_MS);
      setArr([...tempArr]);
    }
    if (tempArr.length !== 0) {
      tempArr[start].state = ElementStates.Modified
      setArr([...tempArr]);
    }
    setButtonPressed(false)
  }

  return (
    <SolutionLayout title="Строка" >
      <div className={styles.main} >
        <Input
          data-testid="input"
          name='input'
          type='text'
          value={values.input}
          onChange={handleChange}
          isLimitText={true}
          maxLength={maxLength}
          extraClass={styles.mr}
        />
        <Button
          data-testid="reverse_button"
          text="Развернуть"
          onClick={addWord}
          isLoader={buttonPressed}
          disabled={buttonPressed || values.input === ''}
        />
      </div>
      <div data-testid='circles' className={styles.letters}>
        {arr.map((item) =>
          <div data-testid='circle' key={item.id}>
            <Circle state={item.state} letter={item.value} />
          </div>
        )
        }
      </div>
    </SolutionLayout>
  );
};
