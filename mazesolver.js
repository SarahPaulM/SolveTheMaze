const csv = require('csv-parser');
const fs = require('fs');

const GOAL = 1;
const START = 45;

const doors = new Map();

// Load the maze structure from a CSV file
// format: room, door, door, door, ...
fs.createReadStream('maze.csv')
  .pipe(csv({ headers: false }))
  .on('data', (row) => {
    const room = parseInt(row["0"]);
    const localDoors = new Set();

    for (const key in row) {
      const door = parseInt(row[key]);
      if (!isNaN(door)) localDoors.add(door);
    }

    localDoors.delete(room); // Remove self-loop
    doors.set(room, localDoors);
  })
  .on('end', () => start());

/**
 * Recursive DFS to find the goal room from a given room.
 * @param {Set<number>} visited - Set of visited rooms on the current path
 * @param {number} door - Current room number
 * @returns {number} - 1 if path found, 0 otherwise
 */
function openDoor(visited, door) {
  const exits = doors.get(door);
  if (!exits) return -1;

  for (const next of exits) {
    if (next === GOAL) {
      console.log("\x1b[31m!Found the end!");
      console.log("Follow this path: \x1b[32m");
      for (const room of visited) {
        console.log(room);
      }
      console.log(next);
      return 1;
    }

    if (next === START || visited.has(next)) continue;

    if (doors.has(next)) {
      visited.add(next);
      const result = openDoor(visited, next);
      if (result > 0) return result;
      visited.delete(next); // Backtrack
    }
  }

  return 0;
}

/**
 * Entry point for the maze solver
 */
function start() {
  console.log("Welcome to the Maze Solver!\n");
  console.log("Loaded doors map:\n", doors, "\n");

  const visited = new Set();
  openDoor(visited, START);
}

module.exports = { doors, openDoor };
