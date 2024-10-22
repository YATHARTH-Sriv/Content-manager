
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
import { useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function ContentGenerator() {
  const [platform, setPlatform] = useState('')
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [generatedBlog, setGeneratedBlog] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showContent, setShowContent] = useState(false)
  const {data:session}=useSession()
  const { toast } = useToast()
  // const userid=session?.userid

  

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
      const res = await axios.get('/api/account-info')
      const accountdata = res.data
      if(accountdata.credits<=0){
        toast({
          variant: "destructive",
          title: 'You are out of credits!',
          description:<Link href={"/subscription"}>Buy Credits </Link>,
        })
        return true
      }
      const response = await axios.post("/api/content-generate", {
        title,
        platform,
        category,
      })

      const data = response.data
      let formattedContent = data.text.replace(/\n/g, '<br />')
      formattedContent = formattedContent.replaceAll("*", '')
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
      if(session?.accessToken ){
        if(generatedBlog.length>0 && platform==='twitter'){
        const response = await axios.post('/api/schedule-post', {
        content: generatedBlog.replace(/^"|"$/g, ""),
        title,
        category
        })
        if (response.status === 200) {
          toast({
          title: 'Tweet Posted successfully!',
          description:"Go check your twitter account",
          })
          } else {
          toast({
          variant: "destructive",
          title: 'Failed to Post your tweet!',
          description:"Something went wrong",
          })
        }
        }else if(platform==='linkedin' || platform==='hashnode'){
                  toast({
                    variant: "destructive",
                    title: 'Currently We only support posting with twitter',
                  })
                }
        }else{
          toast({
            variant: "destructive",
            title: 'Please login to schedule tweet',
            description:<Link href={"/twitterlogin"}>Connect Twitter</Link>
          })
        }
    } catch (error) {
      console.error('Error scheduling tweet:', error);
      alert('An error occurred while scheduling the tweet');
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
              {isLoading ? 'Generating...' : 'Generate Content'}
            </Button>

            {error && <p className="text-red-500">{error}</p>}

            {showContent && (
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Generated Content</Label>
                <ScrollArea className="h-[50vh] w-full p-4 ">
                  {/* <Textarea 
                    // value={generatedBlog.replace(/^"|"$/g, "")} 
                    value={dangerouslySetInnerHTML={{ __html: generatedContent }}}
                    readOnly 
                    className="min-h-full bg-gray-800 border-none text-white resize-none"
                  /> */}
                  <div
                    className="mt-6 border p-4 w-full max-w-md text-black"
                    dangerouslySetInnerHTML={{ __html: generatedBlog }}
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

