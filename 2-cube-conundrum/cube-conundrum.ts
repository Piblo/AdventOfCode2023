import { readFileSync } from "node:fs";
import { resolve } from "node:path";

type Color = "red" | "green" | "blue";
export type CubeSet = Record<Color, number>;

export type Game = {
  id: number;
  reveals: CubeSet[];
};

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

export function cauculatePossibleGamesIdSum(input?: string) {
  const fileContent = readFileSync(resolve(import.meta.dir, "./games.txt"), {
    encoding: "utf-8",
  });

  const games = parseGames(input ?? fileContent);
  const possibleGames = games.filter((x) =>
    x.reveals.every(
      (r) => r.blue <= MAX_BLUE && r.green <= MAX_GREEN && r.red <= MAX_RED
    )
  );

  const result = possibleGames.reduce((sum, nextGame) => sum + nextGame.id, 0);

  return result;
}

export function calculateCubeSetPowerSum() {
  const fileContent = readFileSync(resolve(import.meta.dir, "./games.txt"), {
    encoding: "utf-8",
  });

  const games = parseGames(fileContent);

  const result = games.reduce((sum, game) => {
    const minSet = getMinimumSetOfCubes(game);
    return sum + getCubeSetPower(minSet);
  }, 0);

  return result;
}

export function getMinimumSetOfCubes(game: Game): CubeSet {
  const maxCubeSet: CubeSet = {
    blue: 0,
    green: 0,
    red: 0,
  };

  game.reveals.forEach((reveal) => {
    Object.entries(reveal).forEach(([color, amount]) => {
      if (maxCubeSet[color as Color] < amount || !maxCubeSet[color as Color]) {
        maxCubeSet[color as Color] = amount;
      }
    });
  });

  return maxCubeSet;
}

function getCubeSetPower(cubeSet: CubeSet) {
  return cubeSet.blue * cubeSet.green * cubeSet.red;
}

function parseGames(gamesString: string): Game[] {
  const games: Game[] = [];

  gamesString
    .trim()
    .split("\n")
    .forEach((line, index) => {
      const reveals = parseReveals(line);

      games.push({
        id: index + 1,
        reveals,
      });
    });

  return games;
}

function parseReveals(gameLine: string): CubeSet[] {
  const [_, reveals] = gameLine.trim().split(":");
  return reveals.split(";").map(parseReveal);
}

function parseReveal(revealString: string): CubeSet {
  const reveal: CubeSet = {
    red: 0,
    blue: 0,
    green: 0,
  };

  const reveals = revealString.split(",");
  reveals.forEach((r) => {
    const [amount, color] = r.trim().split(" ") as [string, Color];
    reveal[color] = Number(amount);
  });

  return reveal;
}
