<script lang="ts">
  import { onMount } from "svelte";
  import type { LayoutData } from "./$types";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  import { goto } from "$app/navigation";
  import { Auth } from "aws-amplify";

  export let data: LayoutData;

  onMount(async () => {
    const user = await Auth.currentUserInfo();
    if (!user) goto("/auth/login");
  });

  async function logout() {
    await Auth.signOut();
    localStorage.removeItem("token");
    goto("/auth/login");
  }
</script>

<TopAppBar variant="static" color={"secondary"}>
  <Row>
    <Section>
      <IconButton class="material-icons">menu</IconButton>
      <Title>Loopable</Title>
    </Section>
    <Section align="end" toolbar>
      <IconButton class="material-icons" aria-label="Download" on:click={logout}
        >logout</IconButton
      >
    </Section>
  </Row>
</TopAppBar>

<div class="main">
  <slot />
</div>

<style>
  body {
    margin: 0;
  }
  .main {
    padding: 2rem;
  }
</style>
