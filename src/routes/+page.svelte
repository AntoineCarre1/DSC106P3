<script>
    import {onMount} from 'svelte';
    import * as d3 from 'd3';

let Data = [];

onMount(async () => {
    const res = await fetch('static/Data/API_SP.DYN.LE00.IN_DS2_en_csv_v2_46.csv');
    const csv = await res.text();

    // Split the CSV data into rows using '\n' as the row delimiter
    const rows = csv.split('\n');
    console.log(rows)

    // Parse each row into an array of values using ';' as the column delimiter
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i].split(';'); // Use ';' as the column delimiter
        Data.push(row);
    }

    console.log("Data:", Data);
});

</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
