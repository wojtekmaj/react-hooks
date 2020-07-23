export function duplicate(x) {
  return x * 2;
}

export function duplicateInRandomTime(x) {
  return new Promise(
    (resolve) => setTimeout(() => {
      resolve(x * 2);
    }, Math.random() * 100),
  );
}

export function largerThanTwo(x) {
  return x > 2;
}

export function largerThanTwoInRandomTime(x) {
  return new Promise(
    (resolve) => setTimeout(() => {
      resolve(x > 2);
    }, Math.random() * 100),
  );
}

export function largerThanOneHundred(x) {
  return x > 100;
}

export function largerThanOneHundredInRandomTime(x) {
  return new Promise(
    (resolve) => setTimeout(() => {
      resolve(x > 100);
    }, Math.random() * 100),
  );
}

export function makePushDuplicate() {
  const arr = [];

  function pushDuplicate(x) {
    arr.push(x * 2);
  }

  return [arr, pushDuplicate];
}

export function makePushDuplicateInRandomTime() {
  const arr = [];

  async function pushDuplicate(x) {
    arr.push(await duplicateInRandomTime(x));
  }

  return [arr, pushDuplicate];
}

export const inputArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const doubleInputArr = inputArr.map(duplicate);
