<script>
  import { createGrid, createRandomGrid, nextState } from "./lib/game";
  import Grid from './Grid.svelte'
  
  let grid = createRandomGrid(100);

  function step() {
    grid = nextState(grid);
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step)
</script>

<main>
  <h1>
  Game of life
  </h1>
  <Grid items={grid} />
</main>
