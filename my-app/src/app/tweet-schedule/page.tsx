"use client"
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';


function Page() {
  const { data: session } = useSession();
  const [tweetContent, setTweetContent] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  console.log('Session:', session);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert('You must be signed in to schedule tweets');
      return;
    }

    try {
      const response = await axios.post('/api/schedule-post', {
          content: tweetContent,
          scheduleDate: scheduleDate,
        })

      if (response.status === 200) {
        alert('Tweet scheduled successfully!');
        setTweetContent('');
        setScheduleDate('');
      } else {
        alert('Failed to schedule tweet');
      }
    } catch (error) {
      console.error('Error scheduling tweet:', error);
      alert('An error occurred while scheduling the tweet');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)}
        placeholder="What's happening?"
        maxLength={280}
        required
      />
      <input
        type="datetime-local"
        value={scheduleDate}
        onChange={(e) => setScheduleDate(e.target.value)}
        required
      />
      <button type="submit">Schedule Tweet</button>
    </form>
  );
};
  

export default Page