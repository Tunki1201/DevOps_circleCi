<script lang="ts">
  import Button, { Label, Icon } from "@smui/button";
  import TextField from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import Card from "@smui/card";
  import Snackbar, { Actions } from "@smui/snackbar";
  import IconButton from "@smui/icon-button";
  import { goto } from "$app/navigation";
  import { Auth } from "aws-amplify";

  let isSubmitting = false;
  let username = "travashley826@gmail.com";
  let password = "Password!2#";

  let snackbar: Snackbar;
  let message = "";

  function login() {
    isSubmitting = true;

    Auth.signIn(username, password)
      .then(async (res) => {
        console.log(res);
        const token = `Bearer ${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`;
        localStorage.setItem("token", token);
        goto("/");
        isSubmitting = false;
      })
      .catch((err) => {
        console.log(err);
        message = err.message;
        snackbar.open();
        isSubmitting = false;
      });
  }
</script>

<div class="container">
  <div class="login">
    <Card padded>
      <form on:submit|preventDefault={login} role="form">
        <h2>LOGIN TO LOOPABLE</h2>
        <div class="field">
          <TextField
            bind:value={username}
            label="Username"
            style="width: 100%"
            input$aria-controls="username-helper"
            input$aria-describedby="username-helper"
            required
          />
          <HelperText id="email-helper"
            >Username or email of your account</HelperText
          >
        </div>

        <div class="field">
          <TextField
            bind:value={password}
            label="Password"
            type="password"
            style="width: 100%"
            input$aria-controls="password-helper"
            input$aria-describedby="password-helper"
            required
          />
          <HelperText id="password-helper">Password of your account</HelperText>
        </div>

        <div class="submit">
          <Button
            disabled={isSubmitting}
            aria-disabled={isSubmitting.toString()}
            class="button"
            variant="raised"
            type="submit"
          >
            <Label>Log In</Label>
          </Button>
        </div>
        <br />
        <Label
          >Not registered yet? Register <a href="/auth/register">HERE</a
          >.</Label
        >
      </form>
    </Card>
  </div>
</div>

<Snackbar bind:this={snackbar}>
  <Label>{message}</Label>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>

<style>
  .login {
    width: 360px;
    margin: 0 auto;
    margin-top: 10%;
    display: block;
  }

  .login .field {
    display: block;
    width: 100%;
  }

  .login .field:nth-child(2) {
    margin-top: 10px;
  }

  .submit {
    margin-top: 20px;
  }

  .submit :global(.button) {
    width: 100%;
    text-align: center;
  }
</style>
