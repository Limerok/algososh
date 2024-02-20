export async function sleep(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

export const swap = <T>(arr: Array<T>, start: number, end: number): void => {
  const temp = arr[start];
  arr[start] = arr[end];
  arr[end] = temp;
}