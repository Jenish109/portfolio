import { NextRequest, NextResponse } from "next/server";

// Dynamic import for transformers to avoid SSR issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pipeline: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pipelinePromise: Promise<any> | null = null;

async function getPipeline() {
  if (pipeline) return pipeline;
  
  if (!pipelinePromise) {
    pipelinePromise = import('@xenova/transformers').then((module) => {
      return module.pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
    });
  }
  
  pipeline = await pipelinePromise;
  return pipeline;
}

// Singleton pattern to ensure the pipeline is loaded only once
class ChatPipeline {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static instance: any = null;

  static async getInstance() {
    if (this.instance === null) {
      this.instance = await getPipeline();
    }
    return this.instance;
  }
}

// Sentiment result type
interface SentimentResult {
  label: string;
  score: number;
}

// Simple response generator based on sentiment and portfolio context
function generateResponse(message: string, sentiment: SentimentResult): string {
  const lowerMessage = message.toLowerCase();
  const isPositive = sentiment.label === 'POSITIVE' || sentiment.score > 0.5;

  // Check for common queries and generate appropriate responses
  if (lowerMessage.includes('work') || lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
    return "I'd be happy to show you my work! I've built several projects including AU Chat App (organizational communication platform), Trustbox (cloud-based file storage system), ALLrangeKit (e-commerce with payment integration), and Expense Tracker (cross-platform finance app). Would you like to see my projects or learn about specific technologies I've used?";
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('stack')) {
    return "I specialize in Full Stack Development with React Native, ReactJS, Node.js, MongoDB, and AWS services. I have experience building scalable platforms, mobile applications, and RESTful APIs. What specific skills or technologies would you like to know more about?";
  }

  if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('journey')) {
    return "I'm a Full Stack Developer with experience at Trustbox Cloud (current), Digitattva Technolabs, and Softnoesis. I've worked on various projects ranging from video campaign platforms to mobile apps with offline support. I'd love to share more about my experience!";
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('email')) {
    return "Great to hear from you! You can reach me at jenisvaghasiya09@gmail.com or call +91 97249 92568. I'm open to full-time opportunities and freelance projects. Let's discuss how I can help with your project!";
  }

  if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
    return "You can download my resume from the resume page! It includes my complete work experience, education, skills, and certifications. Is there anything specific you'd like to know about my background?";
  }

  // Default response based on sentiment
  if (isPositive) {
    return "Thank you for your interest! I'm Jenish Vaghasiya, a Full Stack Developer. I'd be happy to tell you more about my work, skills, or projects. What would you like to know?";
  }

  return "I'm here to help you learn more about Jenish's work and experience. Feel free to ask about projects, skills, or how to get in touch!";
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Try to get sentiment analysis, but fallback if it fails
    let sentiment: SentimentResult = { label: "POSITIVE", score: 0.7 };
    
    try {
      const classifier = await ChatPipeline.getInstance();
      const sentimentResult = await classifier(message);
      sentiment = Array.isArray(sentimentResult) 
        ? (sentimentResult[0] as SentimentResult)
        : (sentimentResult as SentimentResult);
    } catch (sentimentError) {
      console.warn("Sentiment analysis failed, using default:", sentimentError);
      // Continue with default sentiment
    }

    // Generate response based on sentiment and message content
    const aiResponse = generateResponse(message, sentiment);

    return NextResponse.json({ 
      response: aiResponse,
      success: true,
      sentiment: sentiment
    });

  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate response",
        response: "I'm having trouble connecting right now. Feel free to reach out directly at jenisvaghasiya09@gmail.com! 📧"
      },
      { status: 500 }
    );
  }
}
