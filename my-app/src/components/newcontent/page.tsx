"use client"
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { CodeViewer, PlatformSelector, TemperatureSelector, CategorySelector } from "./index"
import { useSession } from "next-auth/react"
import TweetPreviewPage from "../tweet/page"

export default function PlaygroundPage() {
  const [platform, setPlatform] = useState('')
  const [temperature, setTemperature] = useState(0.7)
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [generatedBlog, setGeneratedBlog] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showContent, setShowContent] = useState(false)
  const [newcontent, setnewcontent] = useState("")
  const [instruction, setInstruction] = useState("")
  const { toast } = useToast()
  const {data:session}=useSession()
  console.log("session",session?.accessToken)
  console.log("choose platform temp",platform,temperature,title,category)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setGeneratedBlog('')
    setShowContent(false)

    if (!title || !platform ) {
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
        temperature,
        instruction
      })

      const data = response.data
      let formattedContent = data.text.replace(/\n/g, '<br />')
      formattedContent = formattedContent.replaceAll("*", '')
      formattedContent.replace(/^"|"$|/g, '')
      formattedContent.replace("<br />", '')
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
        // e.preventDefault();
        if (!session) {
          alert('You must be signed in to schedule tweets');
          return;
        }
        if(platform!=="Twitter"){
          alert('You must select Twitter as platform to schedule tweets');
          return;
        }
        if (!generatedBlog) {
          alert('Please generate content before scheduling a tweet');
          return;
        }
        let content=generatedBlog.replace(/^"|"$|/g, '')
        content=content.replace("<br />", '')
        setnewcontent(content)
        console.log("newcontent",newcontent)
        try {
          const response = await axios.post('/api/schedule-post', {
              content:content,
              title,
              category,
              // accessToken:session.accessToken
            })
    
          if (response.status === 200) {
            toast({
              variant:"default",
              title: 'Tweet was posted successfully',
              description:"Go Check Your Twitter Account",
              className: 'bg-green-500 text-white',
            })
          } else {
            alert('Failed to schedule tweet');
          }
        } catch (error) {
          console.error('Error scheduling tweet:', error);
          alert('An error occurred while scheduling the tweet');
        }
      };

  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold text-white p-2 ">Generate</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end m-3">
            <div className="hidden space-x-2 md:flex">
              {/* <CodeViewer /> */}
              <TweetPreviewPage content={generatedBlog}/>

            </div>
          </div>
        </div>
        <Separator className=" w-[80%] " />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2 pr-2 ">
                <div className="grid gap-2">
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Mode
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[320px] text-sm" side="left">
                      Choose the interface that best suits your task. You can
                      provide: a simple prompt to complete, starting and ending
                      text to insert a completion within, or some text with
                      instructions to edit it.
                    </HoverCardContent>
                  </HoverCard>
                  <TabsList className="grid grid-cols-1">
                    <TabsTrigger value="complete">
                      <span className="sr-only">Complete</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <rect
                          x="4"
                          y="3"
                          width="12"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="7"
                          width="12"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="8.5"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="8.5"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="13"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                      </svg>
                    </TabsTrigger>
                    {/* <TabsTrigger value="insert">
                      <span className="sr-only">Insert</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
                          fill="currentColor"
                        ></path>
                        <rect
                          x="4"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="8.5"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="13"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                      </svg>
                    </TabsTrigger> */}
                    {/* <TabsTrigger value="edit">
                      <span className="sr-only">Edit</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <rect
                          x="4"
                          y="3"
                          width="12"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="7"
                          width="12"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="15"
                          width="4"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="8.5"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <path
                          d="M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </TabsTrigger> */}
                  </TabsList>
                </div>
                <PlatformSelector platform={platform} setPlatform={setPlatform} /> 
                <TemperatureSelector temperature={temperature} setTemperature={setTemperature} />
                <CategorySelector category={category} setCategory={setCategory} />
              </div>
              <div className="md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                    <div className="flex h-full space-x-4 p-2"> {/* Flex container for side-by-side layout */}
                      {/* Left side: Textarea for title input */}
                      <div className="flex-1">
                        <Textarea
                          placeholder="Enter the title you want to generate content related to."
                          className="min-h-[100px] w-full p-7"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="flex flex-col m-2">
                          <p className=" text-white">Want Add More Details</p>
                          <Label htmlFor="instructions">Instructions</Label>
                          <Textarea
                            id="instructions"
                            placeholder="Want To add additional details."
                            onChange={(e) => setInstruction(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center space-x-2 mt-4">
                          <Button onClick={handleSubmit}>Submit</Button>
                          <Button variant="secondary">
                            <span className="sr-only">Show history</span>
                            <CounterClockwiseClockIcon className="h-4 w-4" />
                          </Button>
                          {generatedBlog && platform==="Twitter" &&  <Button onClick={handleTwitter}>
                            Post it on Twitter
                          </Button>}
                        </div>
                      </div>

                      {/* Right side: Generated content */}
                      {generatedBlog && (
                        <div className="flex-1">
                          <div className="p-4 bg-gray-100 rounded-lg">
                            <h2 className="text-xl font-semibold">Generated Content</h2>
                            <div
                              className="mt-6 border p-4 w-full text-black"
                              dangerouslySetInnerHTML={{ __html: generatedBlog }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                {/* <TabsContent value="insert" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                      <Textarea
                        placeholder="We're writing to [inset]. Congrats from OpenAI!"
                        className="h-full min-h-[300px]"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <div className="rounded-md border bg-muted"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button>Submit</Button>
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent> */}
                <TabsContent value="edit" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full gap-6 lg:grid-cols-2">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-1 flex-col space-y-2">
                          <Label htmlFor="input">Input</Label>
                          <Textarea
                            id="input"
                            placeholder="We is going to the market."
                            className="flex-1 h-full min-h-[300px]"
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="instructions">Instructions</Label>
                          <Textarea
                            id="instructions"
                            placeholder="Fix the grammar."
                          />
                        </div>
                      </div>
                      <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button>Submit</Button>
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  )
}


