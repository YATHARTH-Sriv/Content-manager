"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
// import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const cardData = [
  { title: "Automated Invoice Generation", description: "Save time and reduce errors with our smart invoice creation tools" },
  { title: "Real-Time Data Analytics", description: "Gain instant insights into your financial performance with live updates and dynamic reports" },
  { title: "Customizable Billing Rules", description: "Easily manage complex billing scenarios with AI managed rules" },
  { title: "Manage approvals", description: "Collaborate and align on customer situations before you send invoices" },
  { title: "Seamless Integration", description: "Connect effortlessly with your existing systems and platforms" },
  { title: "Dunning and AI Collections", description: "Keep your customers on track with automated, natural language reminders before and after due dates" },
]

function Hero() {
  return (
    <section className="flex flex-col items-center mt-4 justify-center px-6 py-16 bg-white dark:bg-gray-900 gap-6">
      {/* Heading Section */}
      <div className="text-center max-w-4xl">
        <h1 className="text-3xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 px-28 flex gap-2">
        AI-Powered <p className="text-purple-700">Content</p> 
        </h1>
        <h1 className="text-3xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 flex gap-2">
        <p className="text-purple-700">Marketing</p> Scheduler Platform 
        </h1>
        <p className="text-base md:text-xl mt-2 text-gray-600 dark:text-gray-300">
          Effortlessly generate content blogs and automate content marketing efforts
        </p>
        <p className="text-sm md:text-md mt-3 text-gray-600 dark:text-gray-300">
          AI-powered solutions.
        </p>
      </div>

      {/* Call-to-Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true, amount: 0.8 }}
        className="flex flex-col md:flex-row items-center mt-8 space-y-4 md:space-y-0 md:space-x-6"
      >
        <button className="p-3 bg-black text-white rounded-md hover:bg-blue-700 transition">
          Get Started
        </button>
        <Link href={"/sign-in"}>
          <button className="px-6 py-3 flex gap-2 bg-white text-black hover:text-white rounded-md hover:bg-black transition">
            Schedule Demo 
          </button>
        </Link>
      </motion.div>

      {/* Centered Image */}
      {/* <div className="w-full mt-16 flex justify-center">
        <Image
          src="https://cdn.prod.website-files.com/669e29f940364d4ca4a04943/66d1d8aa5ef36791c1131efb_111165201fef7e5787cc47a17cdc_Header%2520Image-p-800%201.png"
          className="ml-0 rounded-lg"
          height={900}
          width={900}
          alt="centered image"
        />
      </div> */}

      {/* Informational Section */}
      <div className="m-3 p-4 gap-10">
        {/* First Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-10">
          <div className="p-6 text-3xl md:text-4xl font-semibold">
            <p className="ml-5">
              Manual and Inefficient Billing Processes <br /> are holding you back
            </p>
            <p className="text-gray-500 mt-3 ml-5 text-sm md:text-base font-normal">
              Relying on emails and spreadsheets not only delays processes but also leads to errors and inefficiencies that can hurt your cash flow...
            </p>
          </div>
          <div className="flex justify-center mt-6 md:mt-0">
            <Image
              src="/download.jpeg"
              height={500}
              width={500}
              alt="billing inefficiency"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Second Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-10">
          <div className="flex justify-center">
            <Image
              src="/graph.jpeg"
              height={500}
              width={500}
              alt="delayed payments"
              className="rounded-lg"
            />
          </div>
          <div className="p-6 text-3xl md:text-4xl font-semibold ml-5">
            <p>
              Delayed payments are draining your cash flow
            </p>
            <p className="text-gray-500 mt-3 text-sm md:text-base font-normal">
              When payments are delayed by 30 days or more, your cash flow takes a hit. Streamlining invoicing is key to ensuring timely payments...
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="text-center">
        <h1 className="text-md md:text-lg font-bold text-gray-600 dark:text-white mb-4">
          Features
        </h1>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          What sets JustPaid apart
        </h1>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardData.map((card, index) => (
              <Card key={index} className="text-black">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl font-bold">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm md:text-lg mt-2">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;