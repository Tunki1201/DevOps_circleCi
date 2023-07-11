<script lang="ts">
  // @ts-nocheck
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import CircularProgress from "@smui/circular-progress";
  import Card from "@smui/card";
  import Button from "@smui/button";
  import type { PageData } from "./$types";

  export let data: PageData;

  let name = "";
  let files = null;
  let loading = false;

  export let open = false;

  async function createCourse() {
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

    const res = await fetch(`${data.API_ENDPOINT}/courses`, {
      method: "POST",
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
      open = false;
      location.reload();
      loading = false;
    });
  }
</script>

<Dialog
  bind:open
  selection
  aria-labelledby="list-title"
  aria-describedby="list-content"
>
  <Title id="list-title">Create New Course</Title>
  <Content id="mandatory-content">
    <Card padded>
      <Textfield bind:value={name} label="Name">
        <HelperText slot="Name">Helper Text</HelperText>
      </Textfield>
      <br />
      <!-- <Textfield bind:value={files} label="File" type="file" /> -->
      <input type="file" bind:files />
      <br />
      <Button variant="raised" color="secondary" on:click={createCourse}>
        {#if loading}
          <CircularProgress
            style="height: 32px; width: 32px; color: #fff;"
            indeterminate
          />
        {:else}
          Craete
        {/if}
      </Button>
    </Card>
  </Content>
  <Actions>
    <Button variant="raised" action="accept">Close</Button>
  </Actions>
</Dialog>
