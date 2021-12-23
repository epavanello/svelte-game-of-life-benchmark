<script>

  export let items = [];

</script>

<style>

  .container {
    border: solid 1px black;
    margin: 20px auto;
    display: inline-block;
  }

  .cell {
    width: 5px;
    height: 5px;
    background-color: white;
  }
  .alive {
    background-color: black;
  }
  .row {
    flex: 1;
    display: flex;
  }
</style>

<div class="container">
  {#each items as cells, y}
    <div class="row">
      {#each cells as cell, x}
        <div 
          class="cell" 
          class:alive="{cell}" 
        />
      {/each}
    </div>
  {/each}
</div>