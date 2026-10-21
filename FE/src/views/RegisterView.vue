<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { register, requestCsrfCookie } from '@/api/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const data = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
});

const loading = ref(false)
const formError = ref("");

async function onSubmit() {
  try {
    loading.value = true;
    formError.value = "";

    await requestCsrfCookie();
    await register(data);
    
    await router.push({name: "home"})
  } catch (e) {
    if (e instanceof AxiosError) {
      formError.value = e.message;
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h1 class="mt-6 text-2xl font-semibold tracking-tight">Create an account</h1>

        <p class="mt-2 text-sm text-muted-foreground">Get started by creating your account</p>
      </div>

      <!-- Registration form -->
      <div class="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
        <form class="space-y-5">
          <div class="space-y-2">
            <Label for="name">Full name</Label>
            <Input id="name" v-model="data.name" type="text" placeholder="John Doe" autocomplete="name" />
          </div>

          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="data.email" type="email" placeholder="name@example.com" autocomplete="email" />
          </div>

          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              v-model="data.password"
              type="password"
              placeholder="Create a password"
              autocomplete="new-password"
            />
            <p class="text-xs text-muted-foreground">Use at least 8 characters.</p>
          </div>

          <div class="space-y-2">
            <Label for="confirm-password"> Confirm password </Label>
            <Input
              id="confirm-password"
              v-model="data.password_confirmation"
              type="password"
              placeholder="Repeat your password"
              autocomplete="new-password"
            />
          </div>

          <Button :disabled="loading" @click="onSubmit" type="button" class="w-full disabled:bg-primary/50"> Create account </Button>

          <p v-if="formError.trim()" class="text-destructive">{{ formError }}</p>
        </form>

        <div class="relative my-6">
          <Separator />
          <span
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground"
          >
            OR
          </span>
        </div>

        <Button variant="outline" class="w-full" type="button"> Continue with Google </Button>
      </div>

      <!-- Footer -->
      <p class="text-center text-sm text-muted-foreground">
        Already have an account?
        <a href="/login" class="font-medium text-primary underline-offset-4 hover:underline">
          Sign in
        </a>
      </p>

      <p class="text-center text-xs text-muted-foreground">
        By creating an account, you agree to our
        <a href="/terms" class="underline underline-offset-4"> Terms of Service </a>
        and
        <a href="/privacy" class="underline underline-offset-4"> Privacy Policy </a>.
      </p>
    </div>
  </div>
</template>
