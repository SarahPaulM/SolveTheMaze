const { doors, openDoor } = require('./index'); // adjust exports/imports

test('should contain START room', () => {
  expect(doors.has(45)).toBe(true);
});

test('should contain GOAL room', () => {
  expect([...doors.values()].some(set => set.has(1))).toBe(true);
});
