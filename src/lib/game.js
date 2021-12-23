export const range = (to) => [...new Array(to)].map((_, i) => i);

export const createGrid = (size) => {
  const r = range(size).fill(false);

  return r.map(() => r.slice());
};

export const createRandomGrid = (size) => {
  return createGrid(size).map((row) => row.map(() => Math.random() >= 0.8));
};

export const calculateFrameRate = (
  ticks = 0,
  startedAt = Date.now(),
  now = Date.now()
) => (startedAt ? Math.ceil(ticks / ((now - startedAt) / 1000)) : null);

const newKey = (size) => (key) => {
  if (key === -1) {
    return size - 1;
  }
  if (key === size) {
    return 0;
  }
  return key;
};

const newKeys = (size, keys) => keys.map(newKey(size));

const combinePositions = ({ y, x }) =>
  [-1, 0, 1].reduce(
    (a, $y, _, offset) =>
      offset.reduce((b, $x) => ($x || $y ? [...b, [y + $y, x + $x]] : b), a),
    []
  );

const getIn = (grid) => (position) =>
  (([y, x]) => grid[y][x])(newKeys(grid.length, position));

export const getNeighbours = (grid, position) =>
  combinePositions(position)
    .map(getIn(grid))
    .reduce((a, b) => a + b);

export const willLive = (isAlive, neighbours) =>
  isAlive ? neighbours >= 2 && neighbours <= 3 : neighbours === 3;

export const nextState = (grid) =>
  grid.map((row, y) =>
    row.map((column, x) => willLive(column, getNeighbours(grid, { y, x })))
  );

export const toggle = ({ y, x }, current, grid) => {
  const $grid = grid.slice();
  grid[y][x] = !current;
  return $grid;
};
