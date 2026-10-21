<script setup lang="ts">
import { reactive } from 'vue'

import type { CreateCampaignData } from '@/types/api'
import { createCampaign } from '@/api/axios'

import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardContent from '@/components/ui/card/CardContent.vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const formData: CreateCampaignData = reactive({
  name: "",
  description: "",
  platform: "meta",
  objective: "",
  totalBudget: 0,
  dailyBudget: 0,
  startDate: "",
  endDate: "",
})

function submit() {
  createCampaign(formData);
}
</script>

<template>
  <!-- Header -->
  <section>
    <p class="mb-2 text-sm text-muted-foreground">Campaigns / New campaign</p>

    <h1 class="text-3xl font-bold tracking-tight">Create campaign</h1>

    <p class="mt-2 text-muted-foreground">Configure your advertising campaign and its settings.</p>
  </section>

  <div class="space-y-6">
    <!-- General information -->
    <Card>
      <CardHeader>
        <CardTitle>General information</CardTitle>
        <CardDescription> Basic details to identify your campaign. </CardDescription>
      </CardHeader>

      <CardContent class="space-y-5">
        <div class="space-y-2">
          <Label for="campaign-name">Campaign name</Label>
          <Input :v-model="formData.name" id="campaign-name" placeholder="e.g. Summer Product Launch" />
        </div>

        <div class="space-y-2">
          <Label for="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the purpose of this campaign..."
            :rows="3"
            :v-model="formData.description"
          />
        </div>

        <div class="space-y-2">
          <Label>Campaign objective</Label>

          <Select>
            <SelectTrigger class="w-full">
              <SelectValue :v-model="formData.objective" placeholder="Select an objective" />
            </SelectTrigger>

            <SelectContent class="bg-background" :body-lock="false">
              <SelectItem value="awareness">Brand awareness</SelectItem>
              <SelectItem value="installs">App installs</SelectItem>
              <SelectItem value="conversions">Conversions</SelectItem>
              <SelectItem value="traffic">Traffic</SelectItem>
              <SelectItem value="retargeting">Retargeting</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    <!-- Platform -->
    <Card>
      <CardHeader>
        <CardTitle>Advertising platform</CardTitle>
        <CardDescription> Choose where your campaign will run. </CardDescription>
      </CardHeader>

      <CardContent>
        <RadioGroup :v-model="formData.platform" class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Label
            for="platform-meta"
            class="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <RadioGroupItem id="platform-meta" value="meta" />
            <div>
              <p class="font-medium">Meta Ads</p>
              <p class="text-xs text-muted-foreground">Facebook & Instagram</p>
            </div>
          </Label>

          <Label
            for="platform-moloco"
            class="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <RadioGroupItem id="platform-moloco" value="moloco" />
            <div>
              <p class="font-medium">Moloco</p>
              <p class="text-xs text-muted-foreground">Mobile advertising</p>
            </div>
          </Label>

          <Label
            for="platform-applovin"
            class="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <RadioGroupItem id="platform-applovin" value="applovin" />
            <div>
              <p class="font-medium">AppLovin</p>
              <p class="text-xs text-muted-foreground">App marketing</p>
            </div>
          </Label>
        </RadioGroup>
      </CardContent>
    </Card>

    <!-- Budget and schedule -->
    <Card>
      <CardHeader>
        <CardTitle>Budget & schedule</CardTitle>
        <CardDescription> Define your spending limit and campaign duration. </CardDescription>
      </CardHeader>

      <CardContent class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div class="space-y-2">
          <Label for="total-budget">Total budget (€)</Label>
          <Input :v-model="formData.totalBudget" id="total-budget" type="number" min="0" placeholder="2000" />
        </div>

        <div class="space-y-2">
          <Label for="daily-budget">Daily budget (€)</Label>
          <Input :v-model="formData.dailyBudget" id="daily-budget" type="number" min="0" placeholder="100" />
        </div>

        <div class="space-y-2">
          <Label for="start-date">Start date</Label>
          <Input :v-model="formData.startDate" id="start-date" type="date" />
        </div>

        <div class="space-y-2">
          <Label for="end-date">End date</Label>
          <Input :v-model="formData.endDate" id="end-date" type="date" />
        </div>
      </CardContent>
    </Card>

    <!-- Creatives -->
    <Card>
      <CardHeader>
        <CardTitle>Ad creatives</CardTitle>
        <CardDescription> Add the images or videos used in your advertisements. </CardDescription>
      </CardHeader>

      <CardContent>
        <div
          class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border px-6 py-10 text-center"
        >
          <div class="mb-3 flex size-12 items-center justify-center rounded-full bg-muted text-xl">
            ↑
          </div>

          <p class="font-medium">Upload creative assets</p>

          <p class="mt-2 max-w-sm text-sm text-muted-foreground">
            Drag and drop images or videos here, or browse your files.
          </p>

          <Button type="button" variant="outline" class="mt-4"> Browse files </Button>

          <p class="mt-3 text-xs text-muted-foreground">PNG, JPG, MP4 · Maximum file size 100 MB</p>
        </div>
      </CardContent>
    </Card>

    <!-- Actions -->
    <div class="flex flex-col-reverse justify-between gap-3 sm:flex-row sm:items-center">
      <Button variant="outline"> Cancel </Button>

      <div class="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline"> Save as draft </Button>

        <Button @click="submit"> Create campaign </Button>
      </div>
    </div>
  </div>
</template>
