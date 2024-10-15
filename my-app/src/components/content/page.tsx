// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Loader2 } from "lucide-react"
// import axios from "axios"

// export default function ContentGenerator() {
//   const [prompt, setPrompt] = useState("")
//   const [platform, setPlatform] = useState("")
//   const [generatedContent, setGeneratedContent] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setError("")
  //   setGeneratedContent("")

  //   if (!prompt || !platform) {
  //     setError("Please enter a prompt and select a platform.")
  //     return
  //   }

  //   setIsLoading(true)
  //   try {
  //     const response = await axios.post("/api/content-generate", {
  //       title: prompt,
  //       type: platform,
  //     })
  //     const data = await response.data
  //     console.log(data.text)
  //     const formattedContent = data.text.replace(/\n/g, '<br />');
  //     setGeneratedContent(formattedContent)
  //   } catch (err) {
  //     setError("Failed to generate content. Please try again.")
  //     console.log(err)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }
  // const handletwitter=async () => {
  //   const response = await axios.post('/api/schedule-post', {
  //       content: generatedContent,
  //       // scheduleDate: scheduleDate,
  //     })

  //   if (response.status === 200) {
  //     alert('Tweet scheduled successfully!');
  //   } else {
  //     alert('Failed to schedule tweet');
  //   }
  // }

//   return (
//     <div className="max-w-2xl mx-auto p-6 space-y-8">
//       <h1 className="text-3xl font-bold text-center text-white">AI Content Generator</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="space-y-2">
//           <Label htmlFor="prompt" className="text-white">Enter your title or prompt</Label>
//           <Input
//             id="prompt"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="Enter your title or prompt here"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="platform" className="text-white">Select platform</Label>
//           <Select value={platform} onValueChange={setPlatform} required>
//             <SelectTrigger id="platform">
//               <SelectValue placeholder="Select a platform" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="twitter">Twitter</SelectItem>
//               <SelectItem value="medium">Medium</SelectItem>
//               <SelectItem value="hashnode">Hashnode</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <Button type="submit" className="w-full" disabled={isLoading}>
//           {isLoading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Generating...
//             </>
//           ) : (
//             "Generate Content"
//           )}
//         </Button>
//       </form>
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       {generatedContent && (
//         <div className="mt-8 p-4 bg-muted rounded-lg text-white">
//           <h2 className="text-xl font-semibold mb-2 text-black">Generated Content:</h2>
//           {/* <p className="whitespace-pre-wrap">{generatedContent}</p> */}
//           <div
//            className="mt-6 border p-4 w-full max-w-md text-black"
//            dangerouslySetInnerHTML={{ __html: generatedContent }}
//          />
//          <Button onClick={handletwitter} className="w-full text-black bg-white rounded-md" >twitter</Button>
//         </div>
//       )}
//     </div>
//   )
// }
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios'

export default function ContentGenerator() {
  const [platform, setPlatform] = useState('')
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [generatedBlog, setGeneratedBlog] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showContent, setShowContent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setGeneratedBlog('')
    setShowContent(false)

    if (!title || !platform || !category) {
      setError('Please enter a title, select a platform, and category.')
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post("/api/content-generate", {
        title,
        platform,
        category,
      })

      const data = response.data
      const formattedContent = data.text.replace(/\n/g, '<br />')
      setGeneratedBlog(formattedContent)
      setShowContent(true)
    } catch (err) {
      setError("Failed to generate content. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTwitter = async () => {
    try {
      const response = await axios.post('/api/schedule-post', {
        content: generatedBlog,
      })

      if (response.status === 200) {
        alert('Tweet scheduled successfully!')
      } else {
        alert('Failed to schedule tweet')
      }
    } catch (err) {
      alert('Error scheduling tweet')
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-6">Content Generator</h1>
      <Card className="w-[80%] mx-auto  text-black rounded-xl shadow-lg overflow-hidden">
        <div className="flex h-[80vh]">
          {/* Sidebar Section */}
          <div className="w-[30%] border-r p-6 space-y-6 border-gray-700">
            <div>
              <Label className="text-lg font-semibold">Select Platform</Label>
              <RadioGroup className="flex flex-col space-y-2 mt-2" onValueChange={setPlatform}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hashnode" id="hashnode" />
                  <Label htmlFor="hashnode">Hashnode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="twitter" id="twitter" />
                  <Label htmlFor="twitter">Twitter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="linkedin" id="linkedin" />
                  <Label htmlFor="linkedin">LinkedIn</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-lg font-semibold">Select Category</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger className="w-full mt-2 bg-gray-800 border-gray-700 text-white rounded-lg">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="joke">Joke</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
                  onClick={handleTwitter} 
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Schedule Tweet
                </Button>
          </div>

          {/* Main Content Section */}
          <div className="w-[70%] p-6 space-y-6">
            <div>
              <Label htmlFor="title" className="text-lg font-semibold">Blog Title</Label>
              <Input
                id="title"
                placeholder="Enter your blog title"
                className="mt-2 bg-gray-800 border-gray-700 text-white rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={!platform || !category || !title || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {isLoading ? 'Generating...' : 'Generate Blog'}
            </Button>

            {error && <p className="text-red-500">{error}</p>}

            {showContent && (
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Generated Blog</Label>
                <ScrollArea className="h-[50vh] w-full border rounded-md p-4 bg-gray-800 border-gray-700">
                  <Textarea 
                    value={generatedBlog} 
                    readOnly 
                    className="min-h-full bg-gray-800 border-none text-white resize-none"
                  />
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

