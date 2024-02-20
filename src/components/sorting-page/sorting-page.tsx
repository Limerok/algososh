import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { SortOrderType, SortTypes } from "../../types/sort-types";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { sleep, swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

interface ISortingProps {
  arrLength?: number
}

export const SortingPage: React.FC<ISortingProps> = ({ arrLength }: ISortingProps) => {
  const [arr, setArr] = useState<Array<{ number: number, id: number, state: ElementStates }>>([]);
  const [sortType, setSortType] = useState<SortTypes>(SortTypes.Select);
  const [buttonsState, setButtonsState] = useState<{ [buttonName: string]: { isLoader: boolean, disabled: boolean } }>
    (
      {
        decrease: { isLoader: false, disabled: false },
        increase: { isLoader: false, disabled: false },
        newArrButton: { isLoader: false, disabled: false }
      }
    )

  const setButtonsDefault = () => {
    setButtonsState({
      decrease: { isLoader: false, disabled: false },
      increase: { isLoader: false, disabled: false },
      newArrButton: { isLoader: false, disabled: false }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'select') {
      setSortType(SortTypes.Select)
    } else {
      setSortType(SortTypes.Bubble)
    }
  }

  const randomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const generateRandomArr = () => {
    let arr = Array.from({ length: randomInteger(arrLength ?? 3, arrLength ?? 17) }, () => Math.floor(Math.random() * 100))
    setArr(arr.map((number, index) => {
      return { id: index + 1, number: number, state: ElementStates.Default }
    }))
  }

  useEffect(() => {
    if (arrLength === 0) {
      setArr([])
    } else if (arrLength === 1) {
      const randonNumber = Math.random();
      setArr([{ number: randonNumber, id: 1, state: ElementStates.Default }])
    } else {
      generateRandomArr()
    }
  }, [])

  const setDefault = () => {
    arr.map(item => item.state = ElementStates.Default)
  }

  const compare = (a: number, b: number, type: SortOrderType): boolean => {
    if (type === SortOrderType.Increase) {
      return a < b
    } else {
      return a > b
    }
  }

  const selectionSort = async (type: SortOrderType) => {
    setDefault()
    let tempArr = arr;
    const { length } = tempArr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      tempArr[maxInd].state = ElementStates.Changing
      setArr([...tempArr])
      await sleep(SHORT_DELAY_IN_MS)
      for (let j = i + 1; j < length; j++) {
        tempArr[j].state = ElementStates.Changing
        setArr([...tempArr])
        await sleep(SHORT_DELAY_IN_MS)
        if (compare(tempArr[j].number, tempArr[maxInd].number, type)) {
          maxInd = j
        }
        tempArr[j].state = ElementStates.Default
        setArr([...tempArr])
      }
      tempArr[i].state = ElementStates.Default
      swap(tempArr, i, maxInd)
      tempArr[i].state = ElementStates.Modified
      setArr([...tempArr])
    }
    tempArr[length - 1].state = ElementStates.Modified
    setArr([...tempArr]);
    setButtonsDefault()
  };

  const bubbleSort = async (type: SortOrderType) => {
    setDefault();
    let tempArr = arr;
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 0; j < tempArr.length - i - 1; j++) {
        tempArr[j].state = ElementStates.Changing
        tempArr[j + 1].state = ElementStates.Changing
        setArr([...tempArr])
        await sleep(SHORT_DELAY_IN_MS)
        if (compare(tempArr[j + 1].number, tempArr[j].number, type)) {
          await sleep(SHORT_DELAY_IN_MS)
          swap(tempArr, j, j + 1);
          setArr([...tempArr])
        }
        tempArr[j + 1].state = ElementStates.Modified
        tempArr[j].state = ElementStates.Default
        await sleep(SHORT_DELAY_IN_MS)
      }
    }
    tempArr[0].state = ElementStates.Modified
    setArr([...tempArr])
    setButtonsDefault()
  }

  const sortIncrease = () => {
    setButtonsState({
      decrease: { isLoader: false, disabled: true },
      increase: { isLoader: true, disabled: true },
      newArrButton: { isLoader: false, disabled: true }
    })
    if (sortType === SortTypes.Bubble) {
      bubbleSort(SortOrderType.Increase)
    } else {
      selectionSort(SortOrderType.Increase)
    }
  }

  const sortDecrease = () => {
    setButtonsState({
      decrease: { isLoader: true, disabled: true },
      increase: { isLoader: false, disabled: true },
      newArrButton: { isLoader: false, disabled: true }
    })
    if (sortType === SortTypes.Bubble) {
      bubbleSort(SortOrderType.Decrease)
    } else {
      selectionSort(SortOrderType.Decrease)
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.main}>
        <div className={styles.flex}>
          <RadioInput
            name="select"
            extraClass={styles.radio}
            label="Выбор"
            onChange={handleChange}
            checked={sortType === SortTypes.Select}
          />
          <RadioInput
            name="bubble"
            label="Пузырёк"
            onChange={handleChange}
            checked={sortType === SortTypes.Bubble}
          />
        </div>
        <div className={styles.flex}>
          <Button
            data-testid='button_ascending'
            extraClass={styles.button}
            text='По возрастанию'
            sorting={Direction.Ascending}
            onClick={sortIncrease}
            isLoader={buttonsState['increase'].isLoader}
            disabled={buttonsState['increase'].disabled}
          />
          <Button
            data-testid='button_descending'
            isLoader={buttonsState['decrease'].isLoader}
            disabled={buttonsState['decrease'].disabled}
            text='По убыванию' sorting={Direction.Descending}
            onClick={sortDecrease}
          />
        </div>
        <Button
          isLoader={buttonsState['newArrButton'].isLoader}
          disabled={buttonsState['newArrButton'].disabled}
          text='Новый массив'
          onClick={generateRandomArr}
        />
      </div>
      <div data-testid='array-container' className={styles.diagram}>
        {arr.map((item) =>
          <div data-testid='column' key={item.id}>
            <Column index={item.number} key={item.id} state={item.state} />
          </div>
        )
        }
      </div>
    </SolutionLayout>
  );
};
