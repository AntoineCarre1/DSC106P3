<script>
    import {onMount} from 'svelte';
    import * as d3 from 'd3';

    let Data = [];

   onMount(async () => {
   
       const res = await fetch('API_SP.DYN.LE00.IN_DS2_en_csv_v2_46.csv');
   
       const csv = await res.text();
   
       const parsedData = csvParseRows(csv, row => {
        return row.split(';');
    });
   
       console.log("Initial Data:", parsedData);

    // Convert each row from an object to an array
    for (let i = 0; i < parsedData.length; i++) {
        const row = parsedData[i];
        const newRow = {};
        console.log(row);
        for (const key in row) {
            const value = row[key];
            console.log(value);
            newRow[key] = isNaN(value) ? value : Math.round(value * 100) / 100;
        }
        Data.push(newRow);
    }

    console.log("Data after rounding:", Data);
});

console.log("Initial Data:", Data);
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
