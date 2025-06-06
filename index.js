const csv = require('csv-parser');
const fs = require('fs');
const arguments = process.argv;
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
  .on('end', () => start(arguments));


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
function start(arguments) {
  console.log("Welcome to the Maze Solver!\n");
  console.log("Loaded doors map:\n", doors, "\n");
  
  console.log("argument list", arguments);
  
  for (let i=0; i< arguments.length; i++) { 
    console.log("argument: ", arguments[i]);
    }
  // if test argument, then run self test only
  if(arguments[2] == 'test') {
    return test_doors_simple();
    }

  const visited = new Set();
  openDoor(visited, START);
}

function test_doors_simple() {
  const start_room = 1; // set start room to 1
  console.log("Beginning self test..");
  //  check door number 1 for exits (there should be at least one)
  const exits = doors.get(start_room);
  // 
  if (!exits) {
    console.log("no exits from room ", start_room);
    return -1;
  }
  // success if at least one door available from starting room
  else {
    console.log("Success!\nexits from room ", start_room, exits);
    return 0;
    } 
}
