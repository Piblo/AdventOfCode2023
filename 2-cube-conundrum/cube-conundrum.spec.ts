import {
  Game,
  cauculatePossibleGamesIdSum,
  getMinimumSetOfCubes,
} from "./cube-conundrum";
import { describe, expect, it } from "bun:test";

const input = `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `;

describe("Cube conundrum", () => {
  it("Returns the expected sum of game IDs for the given input", () => {
    const result = cauculatePossibleGamesIdSum(input);

    expect(result).toEqual(8);
  });

  it("Returns the minimum set of cubes that must be preset for the game to be possible", () => {
    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    const game: Game = {
      id: 1,
      reveals: [
        { blue: 3, red: 4, green: 0 },
        { red: 1, green: 2, blue: 6 },
        { green: 2, blue: 0, red: 0 },
      ],
    };

    const result = getMinimumSetOfCubes(game);

    expect(result).toEqual({
      red: 4,
      green: 2,
      blue: 6,
    });
  });
});
