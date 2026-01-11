# ChatGPT-Style Portfolio

A modern, interactive portfolio website built with Next.js that features a ChatGPT-style conversation interface. Visitors discover your story, work, and contact options through an engaging chat experience.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-ff69b4)

## Features

- 🗣️ **Conversational UI** - Navigate your portfolio through a chat interface
- 🎯 **Story-Driven** - Hook → Problem → Journey → Proof → Future flow
- 🌓 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 💾 **Persistent Chat** - Chat progress saved to localStorage
- 📱 **Responsive Design** - Works beautifully on all devices
- ♿ **Accessible** - Keyboard navigation, ARIA labels, focus states
- 🎨 **Smooth Animations** - Framer Motion powered transitions
- 📁 **Project Showcase** - Case studies with detailed breakdowns
- 📧 **Contact Form** - Integrated contact with validation

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to the project
cd portfolio-chat

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main chat experience
│   ├── projects/          # Projects listing & case studies
│   ├── resume/            # Resume page
│   └── api/contact/       # Contact form API
├── components/
│   ├── chat/              # Chat UI components
│   ├── layout/            # TopBar, Footer, ContextPanel
│   └── ui/                # Reusable UI components
├── context/               # React Context providers
│   ├── ChatProvider.tsx   # Chat state management
│   └── ThemeProvider.tsx  # Theme state management
├── data/                  # Content data files
│   ├── chatFlow.ts        # Conversation nodes
│   ├── projects.ts        # Project data
│   └── profile.ts         # Personal information
└── lib/                   # Utility functions
    ├── utils.ts           # Class name helpers
    ├── storage.ts         # localStorage helpers
    └── keywordRouter.ts   # Free-text input routing
```

## Customization

### Update Your Profile

Edit `src/data/profile.ts` to add your information:

```typescript
export const profile = {
  name: "Your Name",
  role: "Your Role",
  tagline: "Your tagline here",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  email: "you@example.com",
  // ...
};
```

### Add/Edit Projects

Edit `src/data/projects.ts` to manage your projects:

```typescript
export const projects: Project[] = [
  {
    slug: "my-project",
    title: "My Awesome Project",
    description: "A brief description",
    role: "Full-Stack Developer",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Key achievement 1",
      "Key achievement 2",
    ],
    metrics: [
      { label: "Users", value: "10K+" },
    ],
    links: {
      demo: "https://example.com",
      github: "https://github.com/...",
    },
    problem: "The problem this project solved...",
    solution: "How I solved it...",
    result: "The outcome...",
    images: [],
    featured: true,
  },
  // Add more projects...
];
```

### Customize Chat Flow

Edit `src/data/chatFlow.ts` to modify the conversation:

```typescript
export const chatNodes: Record<string, ChatNode> = {
  hook: {
    id: "hook",
    sectionName: "Hook",
    messages: [
      "Your opening message",
      "Another message",
    ],
    suggestedReplies: [
      { text: "Button text", nextNodeId: "next-node-id" },
    ],
  },
  // Add more nodes...
};
```

### Modify Theme Colors

Edit `src/app/globals.css` to customize colors:

```css
:root {
  --color-accent: 20 184 166;  /* Teal accent */
  /* ... other colors */
}

[data-theme="dark"] {
  --color-background: 15 23 42;
  /* ... dark theme colors */
}
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Main chat experience |
| `/projects` | Grid view of all projects |
| `/projects/[slug]` | Individual project case study |
| `/resume` | Resume page with download |
| `/api/contact` | Contact form handler (POST) |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: React Context + localStorage

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Deploy

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- Railway
- AWS Amplify
- Any Node.js hosting

## Contact API

The `/api/contact` endpoint accepts POST requests with:

```json
{
  "name": "Visitor Name",
  "email": "visitor@example.com",
  "message": "Hello!"
}
```

To send actual emails, integrate a service like:
- [Resend](https://resend.com)
- [SendGrid](https://sendgrid.com)
- [Nodemailer](https://nodemailer.com)

## License

MIT License - feel free to use this for your own portfolio!

## Support

If you find this helpful, consider:
- ⭐ Starring the repo
- 🐛 Reporting issues
- 🤝 Contributing improvements

