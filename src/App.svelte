<script>
  import { createRandomGrid, nextState } from "./lib/game";
  import Grid from "./Grid.svelte";

  let grid = createRandomGrid(200, 200);

  let counter = 0;

  function step() {
    grid = nextState(grid);
    requestAnimationFrame(step);
    counter++;
  }
  step();
</script>

<main>
  <h1>Game of life</h1>
  <Grid items={grid} />
  counter: {counter}
</main>
