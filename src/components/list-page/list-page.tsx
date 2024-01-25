import React from "react";
import styles from './list-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.main}>
        <div className={styles.column}>
          <Input placeholder="Введите значение" extraClass={styles.input} type='text' isLimitText={true} maxLength={4} />
          <Button extraClass={styles.buttonsValue} text='Добавить в head' />
          <Button extraClass={styles.buttonsValue} text='Добавить в tail' />
          <Button extraClass={styles.buttonsValue} text='Удалить из head' />
          <Button extraClass={styles.buttonsValue} text='Удалить из tail' />
        </div>
        <div className={styles.column}>
          <Input placeholder="Введите индекс" extraClass={styles.input} type='text' />
          <Button extraClass={styles.buttonsIndex} text='Добавить по индексу' />
          <Button extraClass={styles.buttonsIndex} text='Удалить по индексу' />
        </div>
      </div>
    </SolutionLayout>
  );
};
