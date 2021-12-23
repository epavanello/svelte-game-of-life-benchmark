<script>

  export let items = [];

</script>

<div class="container">
  {#each items as cells, y (y)}
    <div class="row">
      {#each cells as cell, x (x)}
        <div 
          class="cell" 
          class:alive="{cell}" 
        />
      {/each}
    </div>
  {/each}
</div>