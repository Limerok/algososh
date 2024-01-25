import React, { useState } from "react";
import styles from './stack-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "../stack/stack";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const StackPage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const stack = new Stack<string>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.main}>
        <div className={styles.stack}>
          <Input extraClass={styles.input} type='text' isLimitText={true} maxLength={4} onChange={onChange} />
          <Button text='Добавить' />
          <Button text='Удалить' />
        </div>
        <Button text='Очистить' />
      </div>
    </SolutionLayout>
  );
};
