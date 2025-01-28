"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { VoiceAssistant } from "@/lib/voice-assistant"

interface VoiceAssistantContextType {
  isListening: boolean
  lastCommand: string
  response: string
  startListening: () => void
  stopListening: () => void
}

const VoiceAssistantContext = createContext<VoiceAssistantContextType | null>(null)

export function VoiceAssistantProvider({ children }: { children: ReactNode }) {
  const [assistant, setAssistant] = useState<VoiceAssistant | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [lastCommand, setLastCommand] = useState("")
  const [response, setResponse] = useState("")

  useEffect(() => {
    const assistant = new VoiceAssistant()

    assistant.onResult((text) => {
      setLastCommand(text)
    })

    assistant.onListening((listening) => {
      setIsListening(listening)
    })

    assistant.onError((error) => {
      console.error("Voice Assistant Error:", error)
      setResponse(`Error: ${error}`)
      setIsListening(false)
    })

    setAssistant(assistant)

    return () => {
      assistant.stop()
    }
  }, [])

  const startListening = () => {
    setResponse("")
    assistant?.start()
  }

  const stopListening = () => {
    assistant?.stop()
  }

  return (
    <VoiceAssistantContext.Provider
      value={{
        isListening,
        lastCommand,
        response,
        startListening,
        stopListening,
      }}
    >
      {children}
    </VoiceAssistantContext.Provider>
  )
}

export function useVoiceAssistant() {
  const context = useContext(VoiceAssistantContext)
  if (!context) {
    throw new Error("useVoiceAssistant must be used within a VoiceAssistantProvider")
  }
  return context
}

