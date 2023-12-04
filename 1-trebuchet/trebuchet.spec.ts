import { describe, expect, it } from "bun:test";
import { getLineDigits, trebuchet } from "./trebuchet";

describe("trebuchet", () => {
  it.each([
    ["1abc2", 12],
    ["pqr3stu8vwx", 38],
    ["a1b2c3d4e5f", 15],
    ["treb7uchet", 77],
    ["two1nine", 29],
    ["eightwothree", 83],
    ["abcone2threexyz", 13],
    ["xtwone3four", 24],
    ["4nineeightseven2", 42],
    ["zoneight234", 14],
    ["7pqrstsixteen", 76],
    ["zerothreeosiufj", 33],
    ["6bgqscglgsninefour9nine", 69],
    ["1seven5tvmhzxsldbnine9onethree3", 13],
    ["52", 52],
    ["sevencplmbvshm5flzlqxlbjjcrfxv18fivebpscblpj", 75],
    ["eightwothree", 83],
    ["ninejfvfsp6twoness", 91],
  ])("Returns the correct digits for a line (%s)", (line, expectedDigits) => {
    const result = getLineDigits(line);

    expect(result).toEqual(expectedDigits);
  });

  it("Returns the sum of he digits of each line", () => {
    const lines = [
      "two1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "zoneight234",
      "7pqrstsixteen",
    ];
    const result = trebuchet(lines);

    expect(result).toEqual(281);
  });
});
