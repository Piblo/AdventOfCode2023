import {
  calculateCubeSetPowerSum,
  cauculatePossibleGamesIdSum,
} from "./cube-conundrum";

const result = cauculatePossibleGamesIdSum();
console.log("Part 1: Sum of IDs that are possible", result);

const powerResult = calculateCubeSetPowerSum();
console.log("Part 2: Sum of power of minimum cube sets", powerResult);
