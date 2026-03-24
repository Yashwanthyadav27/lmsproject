'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your LMS assistant. How can I help you today? 😊",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simulated AI responses for common questions
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes('course') || lowercaseMessage.includes('subject')) {
      return "We offer three amazing courses:\n\n1. **Python Programming** - Learn Python from basics to advanced\n2. **Data Structures & Algorithms** - Master DSA concepts\n3. **Web Development Bootcamp** - Full-stack development\n\nWhich course interests you?";
    }

    if (lowercaseMessage.includes('python')) {
      return "Our Python Programming course covers:\n\n• Variables and Data Types\n• Control Flow and Functions\n• Object-Oriented Programming\n• File Handling\n• Error Handling\n\nThe course has 10 videos across 3 sections. Ready to start learning?";
    }

    if (lowercaseMessage.includes('web') || lowercaseMessage.includes('development')) {
      return "The Web Development Bootcamp includes:\n\n• HTML Fundamentals\n• CSS Essentials (Flexbox & Grid)\n• JavaScript Basics\n• React.js Framework\n\nYou'll build real projects and gain practical skills!";
    }

    if (lowercaseMessage.includes('dsa') || lowercaseMessage.includes('algorithm') || lowercaseMessage.includes('data structure')) {
      return "Data Structures & Algorithms covers:\n\n• Time & Space Complexity (Big O)\n• Arrays and Strings\n• Linked Lists (Singly & Doubly)\n• Problem-solving techniques\n\nEssential for coding interviews!";
    }

    if (lowercaseMessage.includes('progress') || lowercaseMessage.includes('track')) {
      return "To track your progress:\n\n1. Complete videos by watching 90%+\n2. Visit the Profile page to see your completion percentage\n3. Progress auto-saves every 10 seconds\n4. Videos unlock sequentially as you complete them";
    }

    if (lowercaseMessage.includes('login') || lowercaseMessage.includes('register')) {
      return "Getting started is easy:\n\n1. Click 'Sign Up' to create an account\n2. Enter your name, email, and password\n3. After registration, login with your credentials\n4. Start exploring courses!";
    }

    if (lowercaseMessage.includes('video') && (lowercaseMessage.includes('lock') || lowercaseMessage.includes('unlock'))) {
      return "Videos unlock sequentially:\n\n• First video is always available\n• Watch 90% of a video to mark it complete\n• Next video unlocks automatically\n• Lock icons show which videos are still locked";
    }

    if (lowercaseMessage.includes('how') || lowercaseMessage.includes('help') || lowercaseMessage.includes('use')) {
      return "Here's how to use LMS:\n\n1. **Browse Courses** - View available courses on the home page\n2. **Select a Course** - Click on any course to see details\n3. **Watch Videos** - Start with the first video\n4. **Track Progress** - Complete videos to unlock more\n5. **View Dashboard** - Check your progress in Profile\n\nNeed help with something specific?";
    }

    if (lowercaseMessage.includes('thank')) {
      return "You're welcome! Happy learning! 🎉 Feel free to ask if you have more questions.";
    }

    // Default response
    return "I'd be happy to help you with:\n\n• Course information\n• How to navigate the platform\n• Progress tracking\n• Getting started guide\n\nWhat would you like to know?";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAIResponse(userMessage);
      
      // Simulate typing delay
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-pink-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-4">
            <h3 className="text-white font-bold text-lg">LMS Assistant</h3>
            <p className="text-pink-100 text-sm">Ask me anything about your courses</p>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block max-w-[80%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-pink-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-md rounded-bl-none border border-pink-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block bg-white p-3 rounded-2xl rounded-bl-none shadow-md border border-pink-100">
                  <Loader2 className="w-5 h-5 text-pink-500 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-pink-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-2 rounded-full hover:from-pink-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
