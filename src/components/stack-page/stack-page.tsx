import React, { useState } from "react";
import styles from './stack-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./class-stack";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { nanoid } from "nanoid";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";

type TStackElement = {
  value: string;
  id: string;
  index: number;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<Stack<TStackElement>>(new Stack<TStackElement>());
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)

  const [buttonsState, setButtonsState] = useState<{ [buttonName: string]: { isLoader: boolean, disabled: boolean } }>
    (
      {
        addElement: { isLoader: false, disabled: false },
        deleteElement: { isLoader: false, disabled: false },
        clear: { isLoader: false, disabled: false }
      }
    )

  const { values, handleChange, setValues } = useForm({
    input: ''
  });

  const maxLenght = 4;

  const setButtonsDefault = () => {
    setButtonsState({
      addElement: { isLoader: false, disabled: false },
      deleteElement: { isLoader: false, disabled: false },
      clear: { isLoader: false, disabled: false }
    })
  }

  const addElement = async () => {
    setButtonsState({
      addElement: { isLoader: true, disabled: true },
      deleteElement: { isLoader: false, disabled: true },
      clear: { isLoader: false, disabled: true }
    })
    const newElement: TStackElement = { value: values.input, id: nanoid(), index: stack.getSize(), state: ElementStates.Changing }
    stack.push(newElement)
    await sleep(SHORT_DELAY_IN_MS)
    setShouldUpdate(!shouldUpdate)
    await sleep(SHORT_DELAY_IN_MS)
    stack.pop()
    newElement.state = ElementStates.Default
    stack.push(newElement)
    setValues({
      input: ''
    })
    setButtonsDefault()
  }

  const deleteElement = async () => {
    setButtonsState({
      addElement: { isLoader: false, disabled: true },
      deleteElement: { isLoader: true, disabled: true },
      clear: { isLoader: false, disabled: true }
    })
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
      setButtonsDefault()
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
          <Input
            data-testid="input"
            name='input'
            value={values.input}
            extraClass={styles.input}
            type='text'
            isLimitText={true}
            maxLength={maxLenght}
            onChange={handleChange}
          />
          <Button
            text='Добавить'
            data-testid="add__button"
            onClick={addElement}
            disabled={values.input === '' || buttonsState.addElement.disabled}
            isLoader={buttonsState.addElement.isLoader}
          />
          <Button
            data-testid="delete__button"
            text='Удалить'
            onClick={deleteElement}
            disabled={stack.getElements().length === 0 || buttonsState.deleteElement.disabled}
            isLoader={buttonsState.deleteElement.isLoader}

          />
        </div>
        <Button
          data-testid="clean__button"
          text='Очистить'
          onClick={clear}
          disabled={stack.getElements().length === 0 || buttonsState.clear.disabled}
          isLoader={buttonsState.clear.isLoader}
        />
      </div>
      <div className={styles.elements}>
        {stack.getElements().map((item) => <Circle head={item.id === (stack.peak() as TStackElement).id ? 'top' : ''} key={item.id} state={item.state} letter={item.value} index={item.index} />)}
      </div>
    </SolutionLayout>
  );
};
