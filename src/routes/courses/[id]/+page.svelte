<script lang="ts">
  import Button from "@smui/button";
  /** @type {import('./$types').PageData} */
  import Textfield from "@smui/textfield";
  import Card from "@smui/card";
  import CircularProgress from "@smui/circular-progress";
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";

  export let data: PageData;

  let name = data.course.name;
  let file = data.course.file;
  let files = null;

  let loading = false;

  async function editCourse() {
    loading = true;
    let fileNew = null;
    if (files && files[0]) {
      fileNew = await fetch(data.BUCKET_URL, {
        body: files[0],
        method: "PUT",
        headers: {
          "Content-Type": files[0].type,
          "Content-Disposition": `attachment; filename="${files[0].name}"`,
        },
      });
    }

    const res = await fetch(`${data.API_ENDPOINT}/courses/${data.course.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        file: fileNew ? fileNew.url.split("?")[0] : "",
      }),
    }).then((res) => {
      res.json();

      goto("/");
    });
  }
</script>

<div class="card-display">
  <div class="card-container">
    <Card padded>
      <Textfield bind:value={name} label="Name" />
      <br />
      <div class="hide-file-ui">
        <!-- <Textfield bind:value={files} label="File" type="file" /> -->
        <input type="file" bind:files />
      </div>
      <br />
      <Button variant="raised" color="secondary" on:click={editCourse}>
        {#if loading}
          <CircularProgress
            style="height: 32px; width: 32px; color: #fff;"
            indeterminate
          />
        {:else}
          Save
        {/if}
      </Button>
    </Card>
  </div>
</div>
