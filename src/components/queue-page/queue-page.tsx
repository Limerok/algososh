import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css'
import { Queue } from "./class-queue";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";

type TQueueElement = {
  value: string;
  id: string;
}

export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<string>(7))
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)
  const [headIndex, setHeadIndex] = useState<number>(0);
  const [tailIndex, setTailIndex] = useState<number>(0);
  const [highlightedElement, setHighlitghedElement] = useState<number | null>();

  const [buttonsState, setButtonsState] = useState<{ [buttonName: string]: { isLoader: boolean, disabled: boolean } }>
    (
      {
        addElement: { isLoader: false, disabled: false },
        deleteElement: { isLoader: false, disabled: false },
        clear: { isLoader: false, disabled: false }
      }
    )

  const { values, handleChange, setValues } = useForm({
    input: '',
  });

  const maxLength = 4;

  const setButtonsDefault = () => {
    setButtonsState({
      addElement: { isLoader: false, disabled: false },
      deleteElement: { isLoader: false, disabled: false },
      clear: { isLoader: false, disabled: false }
    })
  }

  const enqueue = async () => {
    setButtonsState({
      addElement: { isLoader: true, disabled: true },
      deleteElement: { isLoader: false, disabled: true },
      clear: { isLoader: false, disabled: true }
    })
    setHighlitghedElement(queue.getTail());
    await sleep(SHORT_DELAY_IN_MS);
    let queueElement = values.input
    queue.enqueue(queueElement)
    setTailIndex(queue.getTail())
    setHighlitghedElement(null);
    setShouldUpdate(!shouldUpdate)
    setValues({
      input: ''
    })
    setButtonsDefault()

    console.log(queue)
    console.log(`headIndex ${headIndex}`)
    console.log(`tailIndex ${tailIndex}`)
    console.log(queue.getLength())
  }

  const dequeue = async () => {
    setButtonsState({
      addElement: { isLoader: false, disabled: true },
      deleteElement: { isLoader: true, disabled: true },
      clear: { isLoader: false, disabled: true }
    })
    setHighlitghedElement(queue.getHead());
    await sleep(SHORT_DELAY_IN_MS);
    queue.dequeue()
    setHeadIndex(queue.getHead())
    setHighlitghedElement(null);
    setShouldUpdate(!shouldUpdate)
    setButtonsDefault()
  }

  const clear = () => {
    setButtonsState({
      addElement: { isLoader: false, disabled: true },
      deleteElement: { isLoader: false, disabled: true },
      clear: { isLoader: true, disabled: true }
    })
    queue.clear()
    setHeadIndex(0)
    setTailIndex(0)
    setButtonsDefault()
  }

  return (
    <SolutionLayout title="Очередь">

      <div className={styles.main}>
        <div className={styles.stack}>
          <Input
            data-testid="input"
            name='input'
            value={values.input}
            extraClass={styles.input}
            type='text'
            isLimitText={true}
            maxLength={maxLength}
            onChange={handleChange}
          />
          <Button
            data-testid="add__button"
            text='Добавить'
            onClick={enqueue}
            disabled={values.input === '' || buttonsState.addElement.disabled || queue.getLength() === 7}
            isLoader={buttonsState.addElement.isLoader}
          />
          <Button
            data-testid="delete__button"
            text='Удалить'
            onClick={dequeue}
            disabled={queue.isEmpty() || buttonsState.deleteElement.disabled}
            isLoader={buttonsState.deleteElement.isLoader}
          />
        </div>
        <Button
          data-testid="clean__button"
          text='Очистить'
          onClick={clear}
          disabled={queue.isEmpty() || buttonsState.clear.disabled}
          isLoader={buttonsState.clear.isLoader}
        />
      </div>
      <div className={styles.elements}>
        {
          queue.getElements().map((item, index) =>
            <Circle head={item !== null && index === headIndex ? 'head' : ''}
              tail={item !== null && index === tailIndex - 1 ? 'tail' : ''}
              index={index}
              key={index}
              state={index === highlightedElement ? ElementStates.Changing : ElementStates.Default}
              letter={item ?? ''} />)
        }
      </div>
    </SolutionLayout>
  );
};