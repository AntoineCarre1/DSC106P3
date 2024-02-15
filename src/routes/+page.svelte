<script>
    import {onMount} from 'svelte';
    import * as d3 from 'd3';
    import { writable } from 'svelte/store';
    let Data = [];
    let dataStore = writable([]);
   onMount(async () => {
   
       const res = await fetch('API_SP.DYN.LE00.IN_DS2_en_csv_v2_46.csv');
   
       const csv = await res.text();
   
       Data = d3.csvParse(csv, d3.autoType)
   
       console.log("Initial Data:", Data);

    // Convert each row from an object to an array
    Data = Data.map(row => {
        const values = Object.values(row).slice(4); // Exclude the first four columns
        return values.map(value => {console.log();
        Math.round(value * 100) / 100});
    });
    dataStore.set(Data);
    console.log("Data after rounding:", Data);
});

console.log("Initial Data:", Data);
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
