"use client"

import { format } from "date-fns"

type CommandHandler = (args: string) => Promise<string>

const commands: Record<string, CommandHandler> = {
  "what time is it": async () => {
    const now = new Date()
    return `It's ${format(now, "h:mm a")}`
  },
  "what's the date": async () => {
    const now = new Date()
    return `Today is ${format(now, "EEEE, MMMM d, yyyy")}`
  },
  "what's the weather": async () => {
    // In a real app, fetch from weather API
    return "It's currently 27°C and sunny in your location"
  },
  "add todo": async (task) => {
    // In a real app, save to database
    return `Added "${task}" to your todo list`
  },
  "set reminder": async (reminder) => {
    // In a real app, save to calendar
    return `Set a reminder for "${reminder}"`
  },
}

export class VoiceAssistant {
  private recognition: SpeechRecognition | null = null
  private synthesis: SpeechSynthesisUtterance
  private isListening = false
  private onResultCallback: ((text: string) => void) | null = null
  private onListeningCallback: ((isListening: boolean) => void) | null = null
  private onErrorCallback: ((error: string) => void) | null = null

  constructor() {
    // Initialize speech synthesis
    this.synthesis = new SpeechSynthesisUtterance()
    this.synthesis.lang = "en-US"
    this.synthesis.rate = 1
    this.synthesis.pitch = 1

    // Check if browser supports speech recognition
    if (typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      this.recognition = new SpeechRecognition()
      this.recognition.continuous = false
      this.recognition.interimResults = false
      this.recognition.lang = "en-US"

      // Set up event handlers
      this.recognition.onresult = (event) => {
        const text = event.results[0][0].transcript.toLowerCase()
        this.onResultCallback?.(text)
        this.processCommand(text)
      }

      this.recognition.onerror = (event) => {
        this.onErrorCallback?.(`Speech recognition error: ${event.error}`)
        this.isListening = false
        this.onListeningCallback?.(false)
      }

      this.recognition.onend = () => {
        this.isListening = false
        this.onListeningCallback?.(false)
      }
    } else {
      console.warn("Speech recognition not supported in this browser.")
    }
  }

  public async processCommand(text: string): Promise<void> {
    let response = ""

    // Check for exact command matches
    for (const [command, handler] of Object.entries(commands)) {
      if (text.includes(command)) {
        const args = text.replace(command, "").trim()
        response = await handler(args)
        break
      }
    }

    // If no exact match, use ChatGPT (in a real app)
    if (!response) {
      response = "I'll help you with that request."
    }

    this.speak(response)
  }

  public start() {
    if (this.recognition && !this.isListening) {
      try {
        this.recognition.start()
        this.isListening = true
        this.onListeningCallback?.(true)
      } catch (error) {
        console.error("Error starting speech recognition:", error)
        this.onErrorCallback?.("Failed to start speech recognition. Please try again.")
      }
    } else if (!this.recognition) {
      this.onErrorCallback?.("Speech recognition is not supported in this browser.")
    }
  }

  public stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
      this.isListening = false
      this.onListeningCallback?.(false)
    }
  }

  public speak(text: string) {
    this.synthesis.text = text
    window.speechSynthesis.speak(this.synthesis)
  }

  public onResult(callback: (text: string) => void) {
    this.onResultCallback = callback
  }

  public onListening(callback: (isListening: boolean) => void) {
    this.onListeningCallback = callback
  }

  public onError(callback: (error: string) => void) {
    this.onErrorCallback = callback
  }
}

