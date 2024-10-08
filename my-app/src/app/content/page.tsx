"use client"
import { useState } from 'react';
import axios from "axios"

export default function ContentDisplay() {
  const [generatedContent, setGeneratedContent] = useState('');

  const fetchGeneratedContent = async () => {
    const response = await axios.post('/api/content-generate', {
        title: 'AI',
        type: 'blog',
    });

    const data = await response.data
    console.log(data.text)
    const formattedContent = data.text.replace(/\n/g, '<br />'); // Replacing \n with <br />
    setGeneratedContent(formattedContent);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-blue-500 text-white p-2 mt-4"
        onClick={fetchGeneratedContent}
      >
        Generate Content
      </button>

      {generatedContent && (
        <div
          className="mt-6 border p-4 w-full max-w-md"
          dangerouslySetInnerHTML={{ __html: generatedContent }}
        />
      )}
    </div>
  );
}
