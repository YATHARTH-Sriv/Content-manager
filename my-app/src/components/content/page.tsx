"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import axios from "axios"

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState("")
  const [platform, setPlatform] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setGeneratedContent("")

    if (!prompt || !platform) {
      setError("Please enter a prompt and select a platform.")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post("/api/content-generate", {
        title: prompt,
        type: platform,
      })
      const data = await response.data
      console.log(data.text)
      const formattedContent = data.text.replace(/\n/g, '<br />');
      setGeneratedContent(formattedContent)
    } catch (err) {
      setError("Failed to generate content. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  const handletwitter=async () => {
    const response = await axios.post('/api/schedule-post', {
        content: generatedContent,
        // scheduleDate: scheduleDate,
      })

    if (response.status === 200) {
      alert('Tweet scheduled successfully!');
    } else {
      alert('Failed to schedule tweet');
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">AI Content Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Enter your title or prompt</Label>
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your title or prompt here"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="platform">Select platform</Label>
          <Select value={platform} onValueChange={setPlatform} required>
            <SelectTrigger id="platform">
              <SelectValue placeholder="Select a platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hashnode">Hashnode</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Content"
          )}
        </Button>
      </form>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {generatedContent && (
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Generated Content:</h2>
          {/* <p className="whitespace-pre-wrap">{generatedContent}</p> */}
          <div
           className="mt-6 border p-4 w-full max-w-md"
           dangerouslySetInnerHTML={{ __html: generatedContent }}
         />
         <Button onClick={handletwitter} className="w-full text-black bg-white rounded-md" >twitter</Button>
        </div>
      )}
    </div>
  )
}