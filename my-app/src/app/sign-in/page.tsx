
'use client';

import { GridPattern } from '@/components/gridpattern/page';
import { SingleImageDropzone } from '@/components/SingleImageDropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';

function Page() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Here you would typically send the form data to your backend
    // This is just a mock delay to simulate a network request
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsLoading(false)
    alert('Sign up successful!') // Replace with actual success handling
  }

  


  const handleUpload = async () => {
    if (file) {
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            console.log(progress); 
          },
        });

        const url = res.url;
        console.log(url);
      } catch (error) {
        console.error("Error uploading image or getting story:", error);
      }
    }
  };

  return (
    <div className="relative bg-black w-full h-screen flex flex-col items-center justify-center">
      {/* Background GridPattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <GridPattern />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full space-x-8 px-4">
        {/* Left Column - Profile Image Upload */}
        <div className="flex flex-col items-center space-y-4">
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file) => setFile(file)}
          />
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all ease-in-out duration-150"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>

        {/* Right Column - Create an Account Form */}
        <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your information to sign up</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium text-gray-700">Full Name</Label>
              <Input id="name" required className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full" />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium text-gray-700">Email</Label>
              <Input id="email" type="email" required className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full" />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium text-gray-700">Password</Label>
              <Input id="password" type="password" required className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full" />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-medium text-gray-700">Confirm Password</Label>
              <Input id="confirmPassword" type="password" required className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full" />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all ease-in-out duration-150 flex items-center justify-center" disabled={isLoading}>
              {isLoading ? (
                <span className="mr-2 h-4 w-4 border-t-transparent border-4 border-white rounded-full animate-spin"></span>
              ) : 'Sign Up'}
            </Button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Page;