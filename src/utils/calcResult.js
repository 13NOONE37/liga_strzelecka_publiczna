const calcResult = (element) => {
  let result = 0;
  let tens = 0;

  for (let i = 1; i <= 10; i++) {
    const shootKey = `shoot_${i}`;
    if (typeof element[shootKey] === 'number') {
      if (element[shootKey] === 10) {
        tens++;
      }
      result += element[shootKey];
    }
  }

  return { result, tens };
};
export default calcResult;
