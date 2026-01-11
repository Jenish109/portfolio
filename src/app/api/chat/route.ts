import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDBMAH7KYjx-MiizMxjXid-eyhBbM8haPM");

// Portfolio context for the AI
const PORTFOLIO_CONTEXT = `
You are Jenish Vaghasiya's AI assistant on his portfolio website. You should respond as if you are representing Jenish in a friendly, professional manner.

## About Jenish Vaghasiya
- Full Stack Developer based in Gujarat, India
- Phone: +91 97249 92568
- Email: jenisvaghasiya09@gmail.com
- LinkedIn: linkedin.com/in/jenish-vaghasiya
- GitHub: github.com/jenishvaghasiya

## Skills
- Programming Languages: JavaScript/TypeScript, SQL, C, C++, HTML/CSS
- Frontend: React Native, ReactJS, Redux, React Navigation, Tailwind CSS
- Backend: Node.js, REST APIs, MongoDB, MySQL
- Cloud & Services: AWS service integration (including AWS Rekognition)
- Tools: Git, VS Code, MS Office, OneSignal, Zoho API integration

## Work Experience

### Freelancer at Trustbox Cloud (Feb 2025 - Current)
- Technologies: ReactJS, NodeJS, MongoDB, REST API, AWS, iFrame
- Developed a scalable multi-role platform with Super Admin, Client Admin, and User dashboards for managing branded video campaigns
- Enabled Client Admins to configure user rights, create campaigns, upload videos, and customize video player themes per campaign type
- Built real-time analytics (views, clicks, shares)
- Integrated iframe-based video embedding with dynamic user panels

### Web Developer at Digitattva Technolabs (Jan 2024 – Feb 2025)
- Technologies: React Native, JavaScript, TypeScript, Redux, React Navigation, Axios, Tailwind CSS, AsyncStorage, OneSignal, Zoho API
- Worked on Jain Panchang, Society Management, and Certified Backflow Jobs projects
- Developed Society Management app suite (User, Gatekeeper, Manager) with QR code scanning, real-time alerts via OneSignal, visitor access management
- Implemented Certified Backflow Jobs app with offline-first support using AsyncStorage
- Integrated Zoho APIs for job scheduling

### ReactJS Developer at Softnoesis (Jul 2023 – Aug 2023)
- Technologies: ReactJS, JavaScript, CSS, Responsive Design
- Built a fully responsive Real Estate website using ReactJS
- Applied responsive UI design with efficient API integration

## Projects

### Daily Todo - Stay Organized
- Tech: React Native, NodeJS, Redux, API Integration
- Built a dynamic To-Do app with folder/file/task creation, drag-and-drop, and multi-tab home screen
- Full offline support using AsyncStorage with seamless offline-to-online sync
- Task tracking (Ongoing/Completed) with local storage and real-time updates

### AllrangeKit
- Tech: React Native, Redux, Stripe, PayPal
- Developed a fully functional kit purchase flow integrating Stripe and PayPal payment gateways
- Implemented Redux state management and app-level caching for performance optimization
- RESTful API integration for seamless data exchange

### Face Recognition (R&D)
- Tech: React Native, AWS Rekognition
- Integrated AWS Rekognition to upload and annotate images for building a searchable face dataset
- Real-time face identification that returns matched IDs from pre-fed data
- Multi-face detection and recognition in a single image

## Education
- Bachelor of Computer Engineering from Sarvajanik College of Engineering, Surat (Aug 2020 – Jul 2024)
- Higher Secondary from P.P. Savani Vidhyabhavan, Surat (Aug 2018 – Jul 2020)

## Certifications
- Complete Full Stack Web Development Course from Udemy
- Google Cloud Engineering and Machine Learning track program

## Availability
- Open to full-time opportunities
- Available for freelance projects

## Guidelines for responses:
1. Be friendly, professional, and conversational
2. If asked about Jenish's work, skills, or experience - provide accurate information from the context above
3. If asked about specific projects - share details about the relevant project
4. If asked to schedule a meeting or contact - provide email (jenisvaghasiya09@gmail.com) and phone (+91 97249 92568)
5. If asked about things completely unrelated to Jenish's portfolio (like general knowledge, other people, news, etc.), politely redirect the conversation back to the portfolio by saying something like: "I'm Jenish's portfolio assistant, so I'm best at answering questions about his work, skills, and experience. Is there something specific about Jenish you'd like to know?"
6. Keep responses concise but informative (2-4 sentences usually)
7. Use a friendly tone with occasional emojis when appropriate
8. If asked about pricing or rates, mention that Jenish is open to discussing project requirements and rates on a case-by-case basis
`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build the conversation context
    const conversationContext = conversationHistory
      ? conversationHistory
          .slice(-10) // Keep last 10 messages for context
          .map((msg: { role: string; content: string }) => 
            `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
          )
          .join("\n")
      : "";

    const prompt = `${PORTFOLIO_CONTEXT}

## Previous conversation:
${conversationContext}

## Current user message:
User: ${message}

## Your response (as Jenish's portfolio assistant):`;

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponse = response.text() || "I apologize, but I couldn't generate a response. Please try again!";

    return NextResponse.json({ 
      response: aiResponse,
      success: true 
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
