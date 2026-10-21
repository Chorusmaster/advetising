export type RegisterData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export type LoginData = {
  email: string;
  password: string;
}

export type CreateCampaignData = {
  name: string
  description?: string
  platform: CampaignPlatform
  objective: string
  totalBudget: number
  dailyBudget: number
  startDate: string
  endDate?: string
}

export type CampaignPlatform = "meta" | "moloco" | "applovin";