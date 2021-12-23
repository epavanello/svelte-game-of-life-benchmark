export const range = (to: number) => [...new Array(to)].map((_, i) => 0);

export const createGrid = (width: number, height: number) => {
  const r = range(width);

  return [...new Array(height)].map(() => range(width))
};

export const createRandomGrid = (width: number, height: number) => {
  return createGrid(width, height).map((row) => row.map(() => Math.random() >= 0.8 ? 1 : 0));
};

const newKey = (size: number) => (key: number) => {
  if (key === -1) {
    return size - 1;
  }
  if (key === size) {
    return 0;
  }
  return key;
};

const newKeys = (size: number, keys: number[]) => keys.map(newKey(size));

const combinePositions = ({ y, x }: { x: number, y: number }) =>
  [-1, 0, 1].reduce(
    (a, $y, _, offset) =>
      offset.reduce((b, $x) => ($x || $y ? [...b, [y + $y, x + $x]] : b), a),
    []
  );

const getIn = (grid: number[][]) => (position: number[]) =>
  (([y, x]) => grid[y][x])(newKeys(grid.length, position));

export const getNeighbours = (grid: number[][], position: { x: number, y: number }) =>
  combinePositions(position)
    .map(getIn(grid))
    .reduce((a, b) => a + b);

export const willLive = (isAlive: number, neighbours: number) =>
  isAlive ? neighbours >= 2 && neighbours <= 3 : neighbours === 3;

export const nextState = (grid: number[][]) =>
  grid.map((row, y) =>
    row.map((column, x) => willLive(column, getNeighbours(grid, { y, x })) ? 1 : 0)
  );

export const toggle = ({ y, x }: { x: number, y: number }, current: number, grid: number[][]) => {
  const $grid = grid.slice();
  grid[y][x] = !current ? 0 : 1;
  return $grid;
};
