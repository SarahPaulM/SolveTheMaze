const csv = require('csv-parser');
const fs = require('fs');

// Define the room exits
const doors = new Map();

fs.createReadStream('maze.csv')
  .pipe(csv({ headers: false }))
  .on('data', (row) => {
	  console.log(row);
  })

/* Let's start with just printing a simple first line of text */
console.log("Welome to the Maze book solver.")
console.log("...")


doors.set(0, [1]);
doors.set(1, [20, 26, 41, 21]);
doors.set(2, [29, 22, 12]);
doors.set(3, [33, 9, 18]);
doors.set(4, [44, 29, 15, 11, 16, 24, 43]);
doors.set(5, [43, 22, 30, 20]);
doors.set(6, [40]);
doors.set(7, [33, 36, 16]);
doors.set(8, [31, 6, 29, 12]);
doors.set(9, [3, 18]);
doors.set(10, [34, 41, 14]);
doors.set(11, [40, 24]);
doors.set(12, [2, 21, 8, 39]);
doors.set(13, [27, 18, 25]);
doors.set(20, [5, 27, 1]);

doors.set(26, [30, 36, 38, 1]);
doors.set(29, [8, 40, 35, 2, 17]);
doors.set(30, [42, 34, 5, 15]);
doors.set(39, [11, 4, 12]);
doors.set(42, [22, 30, 4, 25, 37]);
doors.set(17, [6, 45, 33]);


function DoNothing() {
	// do nothing
}

function OpenDoor(list, door) {
	console.log(door);
			
	_list = doors.get(door);
	if(!_list) {
		return -1;
	}
	for (const doornum of _list) {
		if(doornum == 45) {
			console.log("Found the end!");
			console.log("  Follow this path: ");
			for (const finalDoornum of list) {
				console.log(finalDoornum);
			}
			console.log(doornum); // log this doornum
			console.log();
			return 1;
		}
		else if(doornum == 1) {
			console.log("ignore door to start (1)");
		}
		else {
			// skip rooms we've already visited
			if(list.has(doornum)) {
				console.log("repeated room", doornum,", skip");
			}
			else {
				// double check door exists in map
				if(doors.get(doornum)) {
					list.add(doornum);
					retVal = OpenDoor(list, doornum);
					if(retVal <= 0) {
						// remove door from list if it didn't lead to room 45 (return val 1)
						list.delete(doornum);
					}
				}
				else {
					// throw error, no such room
				}
			}
		}
	}
	return 0;
}
	
const emptyList = new Set()

// loop through all doors until you find 45
OpenDoor(emptyList, 1);


