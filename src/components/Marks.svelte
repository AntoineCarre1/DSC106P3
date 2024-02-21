<script>
    import { geoPath, geoNaturalEarth1 } from "d3";
    export let world = [];
    import { draw } from "svelte/transition";
    import { quadInOut } from "svelte/easing";
    const projection = geoNaturalEarth1();
    const path = geoPath(projection);
  </script>
  
  {#each world as data}
    <path
      transition:draw={{ duration: 5000, delay: 0, easing: quadInOut }}
      d={path(data)}
    />
  {/each}
  
  <style>
    path {
      fill: none;
      stroke: darkgreen;
    }
  </style>