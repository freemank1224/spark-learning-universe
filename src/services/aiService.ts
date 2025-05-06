
import { toast } from "sonner";

// Define the types for messages and responses
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  message: Message;
  error?: string;
}

// Base URL for the AI service
const AI_API_URL = '/api/ai';

/**
 * Send a message to the AI service and get a response
 * @param messages - The conversation history
 * @returns The AI response
 */
export async function sendMessage(messages: Message[]): Promise<AIResponse> {
  try {
    // In a real implementation, this would be a call to your backend
    // Here we just mock the response
    
    const response = await mockAIResponse(messages);
    return response;
  } catch (error) {
    console.error('Error communicating with AI service:', error);
    toast.error('Failed to communicate with AI assistant');
    return {
      message: {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again later.'
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Mock AI response for demonstration purposes
 * This would be replaced with an actual API call in production
 */
async function mockAIResponse(messages: Message[]): Promise<AIResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get the last user message
  const lastMessage = messages[messages.length - 1];
  
  if (lastMessage.role !== 'user') {
    throw new Error('Invalid message sequence');
  }
  
  const userQuery = lastMessage.content.toLowerCase();
  
  // Generate a relevant response based on keywords
  let response: string;
  
  if (userQuery.includes('python') && userQuery.includes('plot')) {
    response = `Here's how you can create a plot in Python using matplotlib:

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Generate some data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create the plot
plt.figure(figsize=(8, 6))
plt.plot(x, y, 'b-', linewidth=2, label='sin(x)')
plt.title('Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)
plt.legend()
plt.show()
\`\`\`

This will create a simple sine wave plot. You can customize colors, line styles, and more using matplotlib's extensive options.`;
  } else if (userQuery.includes('javascript') && (userQuery.includes('animation') || userQuery.includes('animate'))) {
    response = `Here's a simple JavaScript animation using canvas:

\`\`\`javascript
// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 500;
canvas.height = 300;

// Animation variables
let x = 0;
const ballRadius = 20;
const speed = 2;

function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the ball
  ctx.beginPath();
  ctx.arc(x, canvas.height / 2, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#9b87f5';
  ctx.fill();
  ctx.closePath();
  
  // Move the ball
  x += speed;
  
  // Reset position when ball exits screen
  if (x > canvas.width + ballRadius) {
    x = -ballRadius;
  }
  
  // Continue animation
  requestAnimationFrame(animate);
}

// Start animation
animate();
\`\`\`

This creates a simple animation of a ball moving across the screen. You can adjust the speed, size, and appearance as needed.`;
  } else if (userQuery.includes('help') || userQuery.includes('tutorial')) {
    response = `I'm here to help with your coding questions! Here are some things I can assist with:

1. Explaining programming concepts
2. Helping debug your code
3. Suggesting improvements for your code
4. Providing code examples
5. Guiding you through learning exercises

Just ask a specific question about your code or a programming concept you're learning, and I'll do my best to help.`;
  } else {
    response = `I'm here to help with your coding questions. Could you provide more details about what you're trying to accomplish? If you'd like help with Python plotting, JavaScript animations, or any other programming task, just let me know!`;
  }
  
  return {
    message: {
      role: 'assistant',
      content: response
    }
  };
}

/**
 * API interface for the AI service
 * This is the API that would be implemented on your backend
 */
export const aiApi = {
  /**
   * Send a conversation to the AI service
   * @param messages - The conversation history
   * @returns The AI response
   */
  chat: async (messages: Message[]): Promise<AIResponse> => {
    // In a real implementation, this would be a fetch call to your backend
    // For example:
    /*
    const response = await fetch(`${AI_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
    */
    
    // For now, just use our mock implementation
    return mockAIResponse(messages);
  }
};
