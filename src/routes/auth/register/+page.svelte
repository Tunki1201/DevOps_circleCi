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
  let password_confirm = "Password!2#";
  let code = "";
  let verifying = false;

  let snackbar: Snackbar;
  let message = "";

  function register() {
    isSubmitting = true;

    if (password != password_confirm) {
      message = "Please confirm your password.";
      snackbar.open();
      return;
    }

    Auth.signUp({
      username,
      password,
    })
      .then((res) => {
        isSubmitting = false;
        verifying = true;
        console.log(res);
      })
      .catch((err) => {
        isSubmitting = false;
        message = err.message;
        snackbar.open();
      });
  }

  function verify() {
    isSubmitting = true;
    Auth.confirmSignUp(username, code)
      .then((res) => {
        isSubmitting = false;
        console.log(res);
        goto(`/auth/login`);
      })
      .catch((err) => {
        isSubmitting = false;
        message = err.message;
        snackbar.open();
      });
  }
</script>

<div class="container">
  <div class="login">
    <Card padded>
      {#if !verifying}
        <form on:submit|preventDefault={register} role="form">
          <h2>REGISTER</h2>
          <div class="field">
            <TextField
              bind:value={username}
              label="Username"
              style="width: 100%"
              input$aria-controls="username-helper"
              input$aria-describedby="username-helper"
              required
            />
            <HelperText id="username-helper"
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
            <HelperText id="password-helper"
              >Password of your account</HelperText
            >
          </div>

          <div class="field">
            <TextField
              bind:value={password_confirm}
              label="Password Confirmation"
              type="password"
              style="width: 100%"
              input$aria-controls="password-helper"
              input$aria-describedby="password-helper"
              required
            />
            <HelperText id="password-helper">Confirm your password</HelperText>
          </div>

          <div class="submit">
            <Button
              disabled={isSubmitting}
              aria-disabled={isSubmitting.toString()}
              class="button"
              variant="raised"
              type="submit"
            >
              <Label>Register</Label>
            </Button>
          </div>
          <br />
          <Label>Back to <a href="/auth/login">LOGIN</a>.</Label>
        </form>
      {:else}
        <form on:submit|preventDefault={verify} role="form">
          <h2>VERIFY YOUR ACCOUNT</h2>
          <div class="field">
            <TextField
              bind:value={code}
              label="Verification Code"
              style="width: 100%"
              input$aria-controls="code-helper"
              input$aria-describedby="code-helper"
              required
            />
            <HelperText id="code-helper">Verification Code</HelperText>
          </div>

          <div class="submit">
            <Button
              disabled={isSubmitting}
              aria-disabled={isSubmitting.toString()}
              class="button"
              variant="raised"
              type="submit"
            >
              <Label>Verify</Label>
            </Button>
          </div>
          <br />
          <Label>Back to <a href="/auth/login">LOGIN</a>.</Label>
        </form>
      {/if}
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
