
import Image from "next/image"
import { DataTable } from "./components/data-table"
import { columns } from "./components/coloumns"
import { ObjectId } from "mongoose"
import { Task } from "./data/schema"
const alltasks=[
{
    "id": "TASK-8782",
    "title": "You can't compress the program without quantifying the open-source SSD pixel!",
    "status": "twitter",
    "label": "Twitter",
  },
  {
    "id": "TASK-7878",
    "title": "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    "status": "linkedin",
    "label": "Linkedin",
  },
  {
    "id": "TASK-7839",
    "title": "We need to bypass the neural TCP card!",
    "status": "hashnode",
    "label": "Hashnode",
  },
  {
    "id": "TASK-5562",
    "title": "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    "status": "twitter",
    "label": "Twitter",
  },
]

interface Content{
  createdAt:string  
  title: string
  category: string
  platform: string
  content: string
  updatedAt:string
  userId: string
  __v: Number
  _id:ObjectId
}

function TaskPage({allcontent}:{allcontent:Content[]} ) {
  let generatedcontent:any=[]
  allcontent.map((content)=>{
     generatedcontent.push({
      id:content._id.toString(),
      title:content.title,
      status:content.platform,
      label:content.category
     })
  })
  return (
    <div className=" bg-white">
      <div className="md:hidden text-black bg-white">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex text-black">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-black">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of content generated by you.
            </p>
          </div>
        </div>
        <DataTable  data={generatedcontent} columns={columns} />
      </div>
    </div>
  )
}

export default TaskPage