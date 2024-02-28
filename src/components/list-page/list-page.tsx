import React, { useEffect, useState } from "react";
import styles from './list-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from "./class-list-page";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

type TLinkedListElement = {
  value: string;
  head: string | React.ReactElement | null;
  tail: string | React.ReactElement | null;
  state: ElementStates;
}

export const ListPage: React.FC = () => {
  const [linkedList] = useState<LinkedList<TLinkedListElement>>(new LinkedList<TLinkedListElement>())
  const [listElements, setListElements] = useState<TLinkedListElement[]>([]);

  const { values, handleChange, setValues } = useForm({
    valueInput: '',
    indexInput: ''
  });

  const maxLenght = 6;
  const maxNumber = 100;
  const inputMaxLength = 4;

  const [buttonsState, setButtonsState] = useState<{ [buttonName: string]: { isLoader?: boolean, disabled: boolean } }>
    (
      {
        addTail: { isLoader: false, disabled: false },
        addHead: { isLoader: false, disabled: false },
        deleteTail: { isLoader: false, disabled: false },
        deleteHead: { isLoader: false, disabled: false },
        deleteAt: { isLoader: false, disabled: false },
        addAt: { isLoader: false, disabled: false },
        valueInput: { disabled: false },
        indexInput: { disabled: false }

      }
    )

  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)

  const setButtonsDefault = () => {
    setButtonsState({
      addTail: { isLoader: false, disabled: false },
      addHead: { isLoader: false, disabled: false },
      deleteTail: { isLoader: false, disabled: false },
      deleteHead: { isLoader: false, disabled: false },
      deleteAt: { isLoader: false, disabled: false },
      addAt: { isLoader: false, disabled: false },
      valueInput: { disabled: false },
      indexInput: { disabled: false }
    })
  }

  useEffect(() => {
    for (let i = 0; i < maxLenght; i++) {
      const randValue = Math.floor(Math.random() * maxNumber)
      linkedList.append({ value: randValue.toString(), head: null, tail: null, state: ElementStates.Default })
    }
    setShouldUpdate(!shouldUpdate)
  }, [])

  const addElementByIndex = async () => {
    setButtonsState({
      addTail: { isLoader: false, disabled: true },
      addHead: { isLoader: false, disabled: true },
      deleteTail: { isLoader: false, disabled: true },
      deleteHead: { isLoader: false, disabled: true },
      deleteAt: { isLoader: false, disabled: true },
      addAt: { isLoader: true, disabled: true },
      valueInput: { disabled: true },
      indexInput: { disabled: true }
    })
    let element: TLinkedListElement = { value: values.valueInput, head: null, tail: null, state: ElementStates.Default }
    let array = linkedList.toArray()
    for (let i = 0; i <= +values.indexInput; i++) {
      array[i].value.head = (<Circle letter={values.valueInput} isSmall={true} state={ElementStates.Changing} />)
      setListElements(array.map(item => item.value))

      await sleep(SHORT_DELAY_IN_MS)
      array[i].value.head = null
      array[i].value.state = ElementStates.Changing
      setListElements(array.map(item => item.value))
    }
    await sleep(SHORT_DELAY_IN_MS)
    linkedList.insertAt(element, +values.indexInput)
    array = linkedList.toArray()
    array.map(item => item.value.state = ElementStates.Default)
    array[+values.indexInput].value.state = ElementStates.Modified
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    array[+values.indexInput].value.state = ElementStates.Default
    setListElements(array.map(item => item.value))
    setButtonsDefault()
    setValues({
      valueInput: '',
      indexInput: ''
    })
  }

  const deleteElementByIndex = async () => {
    setButtonsState({
      addTail: { isLoader: false, disabled: true },
      addHead: { isLoader: false, disabled: true },
      deleteTail: { isLoader: false, disabled: true },
      deleteHead: { isLoader: false, disabled: true },
      deleteAt: { isLoader: true, disabled: true },
      addAt: { isLoader: false, disabled: true },
      valueInput: { disabled: true },
      indexInput: { disabled: true }
    })
    let array = linkedList.toArray()
    for (let i = 0; i <= +values.indexInput; i++) {
      await sleep(SHORT_DELAY_IN_MS)
      array[i].value.tail = null
      array[i].value.state = ElementStates.Changing
      setListElements(array.map(item => item.value))
    }
    array[+values.indexInput].value.tail = (<Circle letter={array[+values.indexInput].value.value} isSmall={true} state={ElementStates.Changing} />)
    await sleep(SHORT_DELAY_IN_MS)
    array[+values.indexInput].value.value = ''
    array[+values.indexInput].value.state = ElementStates.Default
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    linkedList.deleteAt(+values.indexInput)
    array = linkedList.toArray()
    array.map(item => item.value.state = ElementStates.Default)
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    array[+values.indexInput].value.state = ElementStates.Default
    setListElements(array.map(item => item.value))
    setButtonsDefault();
    setValues({
      ...values,
      indexInput: ''
    })
  }

  const addElementHead = async () => {
    setButtonsState({
      addTail: { isLoader: false, disabled: true },
      addHead: { isLoader: true, disabled: true },
      deleteTail: { isLoader: false, disabled: true },
      deleteHead: { isLoader: false, disabled: true },
      deleteAt: { isLoader: false, disabled: true },
      addAt: { isLoader: false, disabled: true },
      valueInput: { disabled: true },
      indexInput: { disabled: true }
    })
    let element: TLinkedListElement = { value: values.valueInput, head: null, tail: null, state: ElementStates.Default }
    let array = linkedList.toArray()
    array[0].value.head = (<Circle letter={values.valueInput} isSmall={true} state={ElementStates.Changing} />)
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)

    linkedList.prepend(element)
    array = linkedList.toArray();
    array[1].value.head = null;
    array[0].value.state = ElementStates.Modified;
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    array[0].value.state = ElementStates.Default;
    setListElements(array.map(item => item.value))
    setButtonsDefault()
    setValues({
      ...values,
      valueInput: ''
    })
  }

  const addElementTail = async () => {
    setButtonsState({
      addTail: { isLoader: true, disabled: true },
      addHead: { isLoader: false, disabled: true },
      deleteTail: { isLoader: false, disabled: true },
      deleteHead: { isLoader: false, disabled: true },
      deleteAt: { isLoader: false, disabled: true },
      addAt: { isLoader: false, disabled: true },
      valueInput: { disabled: true },
      indexInput: { disabled: true }
    })
    let element: TLinkedListElement = { value: values.valueInput, head: null, tail: null, state: ElementStates.Modified }
    let array = linkedList.toArray()
    array[array.length - 1].value.head = (<Circle letter={values.valueInput} isSmall={true} state={ElementStates.Changing} />)
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    array[array.length - 1].value.head = null
    linkedList.append(element)
    array = linkedList.toArray()
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    array[array.length - 1].value.state = ElementStates.Default
    setListElements(array.map(item => item.value))
    setButtonsDefault()
    setValues({
      ...values,
      valueInput: ''
    })
  }

  const deleteElementHead = async () => {
    setButtonsState({
      addTail: { isLoader: false, disabled: true },
      addHead: { isLoader: false, disabled: true },
      deleteTail: { isLoader: false, disabled: true },
      deleteHead: { isLoader: true, disabled: true },
      deleteAt: { isLoader: false, disabled: true },
      addAt: { isLoader: false, disabled: true },
      valueInput: { disabled: true },
      indexInput: { disabled: true }
    })
    let array = linkedList.toArray()
    array[0].value.tail = (<Circle letter={array[0].value.value} isSmall={true} state={ElementStates.Changing} />)
    array[0].value.value = ''
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)

    linkedList.deleteHead()
    setShouldUpdate(!shouldUpdate)
    setButtonsDefault()
  }

  const deleteElementTail = async () => {
    setButtonsState({
      addTail: { isLoader: false, disabled: true },
      addHead: { isLoader: false, disabled: true },
      deleteTail: { isLoader: true, disabled: true },
      deleteHead: { isLoader: false, disabled: true },
      deleteAt: { isLoader: false, disabled: true },
      addAt: { isLoader: false, disabled: true },
      valueInput: { disabled: true },
      indexInput: { disabled: true }
    })
    let array = linkedList.toArray()
    array[array.length - 1].value.tail = (<Circle letter={array[0].value.value} isSmall={true} state={ElementStates.Changing} />)
    array[array.length - 1].value.value = ''
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    linkedList.deleteTail()
    setShouldUpdate(!shouldUpdate)
    setButtonsDefault()
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.main}>
        <div className={styles.column}>
          <Input
            data-testid="input"
            placeholder="Введите значение"
            name='valueInput'
            value={values.valueInput}
            onChange={handleChange}
            extraClass={styles.input}
            type='text' isLimitText={true}
            maxLength={inputMaxLength}
            disabled={buttonsState.valueInput.disabled}
          />
          <Button
            data-testid="add-head__button"
            extraClass={styles.buttonsValue}
            onClick={addElementHead}
            text='Добавить в head'
            isLoader={buttonsState.addHead.isLoader}
            disabled={values.valueInput === '' || buttonsState.addHead.disabled}
          />
          <Button
            data-testid="add-tail__button"
            extraClass={styles.buttonsValue}
            onClick={addElementTail}
            text='Добавить в tail'
            isLoader={buttonsState.addTail.isLoader}
            disabled={values.valueInput === '' || buttonsState.addTail.disabled}
          />
          <Button
            data-testid="delete-head__button"
            extraClass={styles.buttonsValue}
            onClick={deleteElementHead}
            text='Удалить из head'
            isLoader={buttonsState.deleteHead.isLoader}
            disabled={buttonsState.deleteHead.disabled || linkedList.toArray().length === 0}
          />
          <Button
            data-testid="delete-tail__button"
            extraClass={styles.buttonsValue}
            onClick={deleteElementTail}
            text='Удалить из tail'
            isLoader={buttonsState.deleteTail.isLoader}
            disabled={buttonsState.deleteTail.disabled || linkedList.toArray().length === 0}
          />
        </div>
        <div className={styles.column}>
          <Input
            data-testid="input-index"
            name='indexInput'
            placeholder="Введите индекс"
            value={values.indexInput}
            onChange={handleChange}
            extraClass={styles.input}
            type='number'
            disabled={buttonsState.indexInput.disabled}
          />
          <Button
            data-testid="add-byindex__button"
            extraClass={styles.buttonsIndex}
            onClick={addElementByIndex}
            isLoader={buttonsState.addAt.isLoader}
            disabled={buttonsState.addAt.disabled || values.indexInput === '' || values.valueInput === '' || !/^\d+$/.test(values.indexInput) || +values.indexInput > linkedList.toArray().length - 1}
            text='Добавить по индексу'
          />
          <Button
            data-testid="delete-byindex__button"
            extraClass={styles.buttonsIndex}
            onClick={deleteElementByIndex}
            isLoader={buttonsState.deleteAt.isLoader}
            disabled={buttonsState.deleteAt.disabled || values.indexInput === '' || !/^\d+$/.test(values.indexInput) || +values.indexInput > linkedList.toArray().length - 1}
            text='Удалить по индексу'
          />
        </div>
      </div>
      <div className={styles.elements}>
        {
          linkedList.toArray().map((item, index) =>
            <div className={styles.element} key={index}>
              <Circle
                head={item.value.head === null && index === 0 ? 'head' : item.value.head}
                tail={item.value.tail === null && index === (linkedList.getSize() - 1) ? 'tail' : item.value.tail}
                index={index}
                key={index}
                letter={item.value.value}
                state={item.value.state}
              />
              {item.next !== null && <ArrowIcon />}
            </div>
          )
        }
      </div>
    </SolutionLayout>
  );
};
