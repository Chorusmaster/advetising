<script setup lang="ts">
import { reactive, ref } from 'vue'
import { AxiosError } from 'axios'
import { useRouter, RouterLink } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { login, requestCsrfCookie } from '@/api/axios'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const data = reactive({
  email: '',
  password: '',
  remember: false,
})

const loading = ref(false)
const formError = ref('')

async function onSubmit() {
  try {
    loading.value = true
    formError.value = ''

    await requestCsrfCookie()
    await login(data)

    await auth.fetchUser()
    await router.push({ name: 'home' })
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 422) {
        formError.value =
          e.response.data?.message ?? 'Invalid email or password.'
      } else {
        formError.value = 'Unable to sign in. Please try again.'
      }
    } else {
      formError.value = 'An unexpected error occurred.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-[70vh] items-center justify-center">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-2 text-center">
        <CardTitle class="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Sign in to continue to your workspace
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form class="space-y-5" @submit.prevent="onSubmit">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="data.email"
              type="email"
              placeholder="name@example.com"
              autocomplete="email"
              required
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label for="password">Password</Label>
              <RouterLink
                to="/forgot-password"
                class="text-sm text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </RouterLink>
            </div>

            <Input
              id="password"
              v-model="data.password"
              type="password"
              placeholder="Enter your password"
              autocomplete="current-password"
              required
            />
          </div>

          <div class="flex items-center gap-2">
            <input
              id="remember"
              v-model="data.remember"
              type="checkbox"
              class="size-4 rounded border-input accent-primary"
            />
            <Label for="remember" class="font-normal">
              Remember me
            </Label>
          </div>

          <p
            v-if="formError"
            class="text-sm text-destructive"
            role="alert"
          >
            {{ formError }}
          </p>

          <Button type="submit" class="w-full" :disabled="loading">
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </Button>
        </form>

        <div class="relative my-6">
          <Separator />
          <span
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground"
          >
            OR
          </span>
        </div>

        <Button variant="outline" class="w-full" type="button">
          Continue with Google
        </Button>
      </CardContent>

      <CardFooter class="justify-center border-t px-6 py-4">
        <p class="text-center text-sm text-muted-foreground">
          Don't have an account?
          <RouterLink
            to="/register"
            class="font-medium text-primary underline-offset-4 hover:underline"
          >
            Create an account
          </RouterLink>
        </p>
      </CardFooter>
    </Card>
  </div>
</template>