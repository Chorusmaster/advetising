<script setup lang="ts">
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';
  import { useUserStore } from '@/stores/user';

  const { user, isLoading, fetchUser } = useUserStore();

  onMounted(() => {
    fetchUser()
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

      <div class="flex items-center gap-4">
        <span class="text-sm text-muted-foreground">Marketing workspace</span>
        <div
          class="size-9 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold"
        >
          {{ user }} - {{ isLoading }}
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
