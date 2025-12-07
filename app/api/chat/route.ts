import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

export async function POST(request: Request) {
  try {
    const { message, conversation } = await request.json()

    // Support both single message and conversation array
    if (conversation && Array.isArray(conversation)) {
      // Handle conversation array format
      const model = genAI.getGenerativeModel({ model: GEMINI_MODEL })
      
      const contents = conversation.map(({ role, text }: { role: string; text: string }) => ({
        role: role === "bot" ? "model" : "user",
        parts: [{ text }],
      }))

      const result = await model.generateContent({
        contents,
      })
      
      const response = result.response
      const botReply = response.text()

      return Response.json({
        reply: botReply,
        timestamp: new Date().toISOString(),
      })
    } else if (message && typeof message === "string") {
      // Handle single message format
      const model = genAI.getGenerativeModel({ model: GEMINI_MODEL })
      const result = await model.generateContent(message)
      const response = result.response
      const botReply = response.text()

      return Response.json({
        reply: botReply,
        timestamp: new Date().toISOString(),
      })
    } else {
      return Response.json({ error: "Invalid message format" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("Chat API error:", error)
    
    // Handle specific Gemini API errors
    const errorMessage = error?.message || ""
    const errorStatus = error?.status || error?.statusCode || 500
    
    // Rate limit / Too many requests
    if (errorStatus === 429 || errorMessage.toLowerCase().includes("rate limit") || errorMessage.toLowerCase().includes("quota")) {
      return Response.json(
        { 
          error: "Too many requests. Please wait a moment and try again.",
          type: "rate_limit"
        },
        { status: 429 }
      )
    }
    
    // Quota exceeded
    if (errorMessage.toLowerCase().includes("quota exceeded") || errorMessage.toLowerCase().includes("insufficient quota")) {
      return Response.json(
        { 
          error: "API quota exceeded. Please try again later or check your API key limits.",
          type: "quota_exceeded"
        },
        { status: 429 }
      )
    }
    
    // Invalid API key
    if (errorStatus === 401 || errorStatus === 403 || errorMessage.toLowerCase().includes("api key")) {
      return Response.json(
        { 
          error: "Invalid API key. Please check your configuration.",
          type: "auth_error"
        },
        { status: 401 }
      )
    }
    
    // Generic error
    return Response.json(
      { 
        error: error instanceof Error ? error.message : "Failed to process message",
        type: "server_error"
      },
      { status: errorStatus }
    )
  }
}
