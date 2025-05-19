# SolveTheMaze
Find the path through the book Maze by Christopher Manson

# 🧩 Maze Solver in Node.js

This project is a recursive depth-first search (DFS) maze solver written in Node.js. It reads a maze structure from a CSV file and finds a path from a start room to a goal room using adjacency maps.

---

## 📂 Project Structure

- `mazeSolver.js` — Main program
- `maze.csv` — Input file representing the maze as a room-to-room connection list
- `README.md` — You're reading it!

---

## 🔧 How It Works

- The CSV file represents rooms and the doors that connect them.
- Each row starts with a room number followed by one or more connected rooms.
- The graph is parsed into a `Map<number, Set<number>>`.
- A recursive DFS algorithm searches for a path from `START` to `GOAL`.

---

## 🧠 Example

### `maze.csv`
```csv
0,1
1,20,26,41,21
2,29,22,12
3,33,9,18
...
