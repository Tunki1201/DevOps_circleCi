<script lang="ts">
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import LinearProgress from "@smui/linear-progress";
  import Button from "@smui/button";
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";

  export let data: PageData;

  export let items: any[] = [];
  export let loaded = false;

  async function deleteCourse(id: number) {
    const res = await fetch(`${data.API_ENDPOINT}/courses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json();
      location.reload();
    });
  }
</script>

<DataTable table$aria-label="User list" style="width: 100%;">
  <Head>
    <Row>
      <Cell numeric>ID</Cell>
      <Cell>Name</Cell>
      <Cell>File</Cell>
      <Cell>Actions</Cell>
    </Row>
  </Head>
  <Body>
    {#each items as item (item.id)}
      <Row>
        <Cell numeric>{item.id}</Cell>
        <Cell>{item.name}</Cell>
        <Cell>
          {#if item.file}
            <a href={item.file}>Download File</a>
          {/if}
        </Cell>
        <Cell>
          <Button on:click={() => goto(`/courses/${item.id}`)} color="secondary"
            >Edit</Button
          >&nbsp;
          <Button on:click={() => deleteCourse(item.id)}>Delete</Button>
        </Cell>
      </Row>
    {/each}
  </Body>

  <LinearProgress
    indeterminate
    bind:closed={loaded}
    aria-label="Data is being loaded..."
    slot="progress"
  />
</DataTable>
