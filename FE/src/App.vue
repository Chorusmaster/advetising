<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { RouterView, useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth'
  import { storeToRefs } from 'pinia'
  import { logout } from './api/axios';

  const auth = useAuthStore();
  const router = useRouter();
  const { user, isAuthentificated } = storeToRefs(auth);

  const loading = ref(false);

  const handleLogout = async () => {
    loading.value = true;
    await logout();
    await router.push({name: "login"});
    loading.value = false;
  }

  const initials = computed(() => {
    if (user?.value) {
      const parts = user.value.name.split(" ");
      return parts.map((part) => part.slice(0,1).toUpperCase()).join("")
    } else {
      return "-"
    }
  })
</script>

<template>
  <div class="min-h-screen flex flex-col bg-muted/40 text-foreground">
    <!-- Navbar -->
    <nav class="h-16 px-8 flex items-center justify-between border-b bg-background">
      <div class="flex items-center gap-3">
        <div
          class="size-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold"
        >
          A
        </div>
        <span class="text-lg font-semibold">Advertising Hub</span>
      </div>

      <div v-if="isAuthentificated" class="flex items-center gap-4">
        <button :disabled="loading" @click="handleLogout" class="text-sm text-muted-foreground hover:text-destructive disabled:text-muted-foreground cursor-pointer">Log out</button>
        <div
          class="size-9 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold"
        >
          {{ initials }}
        </div>
      </div>
    </nav>

    <!-- Main -->
    <main class="flex-1 w-full max-w-7xl mx-auto my-8 p-8 space-y-8">
      <RouterView />
    </main>

    <footer class="border-t bg-background px-8 py-4 text-sm text-muted-foreground">
      © Chorusmaster — 2026
    </footer>
  </div>
</template>
