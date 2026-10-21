<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
</script>

<template>
  <div class="space-y-8">
    <section class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Campaigns</h1>
        <p class="mt-2 text-muted-foreground">
          Manage and monitor your advertising campaigns.
        </p>
      </div>

      <Button as-child>
        <RouterLink to="/campaigns/new">
          <span class="mr-1 text-lg leading-none">+</span>
          Create campaign
        </RouterLink>
      </Button>
    </section>

    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card v-for="label in [
        'Total campaigns',
        'Active campaigns',
        'Total spend',
        'Total impressions',
      ]" :key="label">
        <CardContent class="p-6">
          <p class="text-sm font-medium text-muted-foreground">
            {{ label }}
          </p>
          <div class="mt-2 text-3xl font-bold">—</div>
        </CardContent>
      </Card>
    </section>

    <Card class="gap-0 py-0">
      <div
        class="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 class="text-lg font-semibold">All campaigns</h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Overview of your advertising activity
          </p>
        </div>

        <div class="flex gap-3">
          <Input
            type="search"
            placeholder="Search campaigns..."
            class="w-full sm:w-56"
          />
          <Button variant="outline">Filters</Button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Spend</TableHead>
              <TableHead>Impressions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell colspan="6" class="h-32 text-center text-muted-foreground">
                No campaigns yet.
                <Button variant="link" as-child class="ml-1">
                  <RouterLink to="/campaigns/new">
                    Create your first campaign
                  </RouterLink>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div
        class="flex flex-col gap-3 border-t px-5 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
      >
        <span>No campaigns to display</span>

        <div class="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </Card>
  </div>
</template>