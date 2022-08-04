// Функция, возвращающая случайное целое число из переданного диапазона включительно (принёс Кекс).

function getRandomInteger (a, b) {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}
getRandomInteger(10, 20);


// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

function getRandomNumber (a, b, c) {

  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Number(result.toFixed(Math.abs(c)));
}
getRandomNumber(10, 20, 4);
