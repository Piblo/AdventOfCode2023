export function trebuchet(lines: string[]): number {
  return lines
    .map(getLineDigits)
    .reduce((previous, next) => previous + next, 0);
}

export function getLineDigits(line: string): number {
  const digitRegex =
    /[0-9]|one|two|three|four|five|six|seven|eight|nine|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/gi;

  const firstDigit = line.match(digitRegex);

  const lastDigit = reverse(line).match(digitRegex);

  if (!firstDigit || !lastDigit) {
    throw new Error("Could not find digits");
  }

  return Number(`${parseDigit(firstDigit[0])}${parseDigit(lastDigit[0])}`);
}

function parseDigit(digitString: string): number {
  const digit = Number(digitString);

  if (isNaN(digit)) {
    return numberMap[digitString as keyof typeof numberMap];
  }

  return digit;
}

function reverse(line: string): string {
  return Array.from(line).reverse().join("");
}

const numberMap = {
  one: 1,
  eno: 1,
  two: 2,
  owt: 2,
  three: 3,
  eerht: 3,
  four: 4,
  ruof: 4,
  five: 5,
  evif: 5,
  six: 6,
  xis: 6,
  seven: 7,
  neves: 7,
  thgie: 8,
  eight: 8,
  enin: 9,
  nine: 9,
};
