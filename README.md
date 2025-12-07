# Chat Gemini

A modern chat application powered by Google's Gemini AI, built with Next.js 16 and React 19.

## Features

- 💬 Real-time chat interface with Google Gemini AI
- 🎨 Beautiful gradient UI with smooth animations
- ⚡ Built with Next.js App Router and Server Actions
- 🔄 Error handling for rate limits and API quotas
- 📱 Responsive design
- 🌓 Support for both single messages and conversation history

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- pnpm (recommended) or npm

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd chat-gemini
```

### 2. Install dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

To get your Gemini API key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and paste it into your `.env.local` file

### 4. Run the development server

```bash
pnpm dev
```

Or with npm:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production

### 1. Build the application

```bash
npm run build
```

### 2. Start the production server


```bash
npm start
```

The production server will run on [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm dev` - Start development server
- `npm build` - Build the application for production
- `npm start` - Start the production server
- `npm lint` - Run ESLint to check code quality

## Project Structure

```
chat-gemini/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts       # API endpoint for Gemini chat
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Chat interface
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # UI components
│   └── theme-provider.tsx
├── lib/
│   └── utils.ts               # Utility functions
├── .env.local                 # Environment variables (create this)
└── package.json
```
