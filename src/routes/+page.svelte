<script>
    import {onMount} from 'svelte';
    import * as d3 from 'd3';

let Data = [];

onMount(async () => {
    const res = await fetch('static/Data/API_SP.DYN.LE00.IN_DS2_en_csv_v2_46.csv');
    const csv = await res.text();

    // Split the CSV data into rows using '\n' as the row delimiter
    Data = d3.csvParse(csv, d3.autoType
    //row => {return row.split(',');}
    );
    console.log("Data:", Data);
});

</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
