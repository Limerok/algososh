import React, { useState } from "react";
import styles from './stack-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";

type TStackElement = {
  value: string;
  id: string;
  index: number;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [stack, setStack] = useState<Stack<TStackElement>>(new Stack<TStackElement>());
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addElement = async () => {
    const newElement: TStackElement = { value: input, id: nanoid(), index: stack.getSize(), state: ElementStates.Changing }
    stack.push(newElement)
    await sleep(SHORT_DELAY_IN_MS)
    setShouldUpdate(!shouldUpdate)
    await sleep(SHORT_DELAY_IN_MS)
    stack.pop()
    newElement.state = ElementStates.Default
    stack.push(newElement)
    setInput('')
  }

  const deleteElement = async () => {
    let lastElement = stack.peak();
    if (lastElement !== null) {
      lastElement.state = ElementStates.Changing;
      stack.pop();
      stack.push(lastElement);

      setShouldUpdate(!shouldUpdate)
      await sleep(SHORT_DELAY_IN_MS)
      stack.pop();
      setStack(stack)
      setShouldUpdate(!setShouldUpdate)
    }
  }

  const clear = () => {
    stack.clear()
    setShouldUpdate(!shouldUpdate)
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.main}>
        <div className={styles.stack}>
          <Input value={input} extraClass={styles.input} type='text' isLimitText={true} maxLength={4} onChange={onChange} />
          <Button text='Добавить' onClick={addElement} disabled={input === '' ? true : false} />
          <Button text='Удалить' onClick={deleteElement} disabled={stack.getElements().length === 0 ? true : false} />
        </div>
        <Button text='Очистить' onClick={clear} disabled={stack.getElements().length === 0 ? true : false} />
      </div>
      <div className={styles.elements}>
        {stack.getElements().map((item) => <Circle head={item.id === (stack.peak() as TStackElement).id ? 'top' : ''} key={item.id} state={item.state} letter={item.value} index={item.index} />)}
      </div>
    </SolutionLayout>
  );
};
