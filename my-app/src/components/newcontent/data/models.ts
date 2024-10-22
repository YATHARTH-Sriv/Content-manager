export const s = ["", "Codex"] as const

export interface Model {
  id: string
  name: string
  description: string
  strengths?: string
}

export const models: Model[] = [
  {
    id: "1",
    name: "Twitter",
    description:
      "We provide the best most eye-catching tweets for your business. Add additional description for more specific tweets.",
    strengths:
      "With the best hashtags and keywords, we can help you reach your target audience.",
  },
  {
    id: "2",
    name: "Linkedin",
    description: "We provide the best most eye-catching Linkdin Posts for your business.",
    strengths:
      "With the best hashtags and keywords, we can help you reach your target audience.",
  },
  {
    id: "3",
    name: "Hashnode",
    description: "We provide the best most eye-catching Hashnode blogs for your business.",
    strengths:
      "With the best hashtags and keywords, we can help you reach your target audience.",
  },
]