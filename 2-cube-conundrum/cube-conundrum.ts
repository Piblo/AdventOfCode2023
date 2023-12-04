import { readFileSync } from "node:fs";
import { resolve } from "node:path";

type Color = "red" | "green" | "blue";
type Reveal = Record<Color, number>;

type Game = {
  id: number;
  reveals: Reveal[];
};

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

export function calculateCubeConundrum(input?: string) {
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

function parseReveals(gameLine: string): Reveal[] {
  const [_, reveals] = gameLine.trim().split(":");
  return reveals.split(";").map(parseReveal);
}

function parseReveal(revealString: string): Reveal {
  const reveal: Reveal = {
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
