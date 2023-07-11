<script lang="ts">
  import Table from "../components/Table.svelte";
  import Dialog from "../components/Dialog.svelte";
  import { onMount } from "svelte";
  import Button from "@smui/button";
  import type { PageData } from "./$types";

  export let data: PageData;

  type Course = {
    id: number;
    name: string;
    file: string;
  };

  let items: Course[] = [];
  let loaded = false;

  let open = false;

  onMount(() => loadThings());

  function loadThings() {
    if (typeof fetch !== "undefined") {
      loaded = false;

      fetch(`${data.API_ENDPOINT}/courses`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((json) => {
          items = json;
          loaded = true;
        });
    }
  }
</script>

<div style="display:flex; justify-content:space-between; margin-bottom: 1rem">
  <Button on:click={() => (open = true)} color="secondary" variant="raised"
    >Add New</Button
  >
</div>
<Table {items} {loaded} {data} />

<Dialog {open} {data} />
