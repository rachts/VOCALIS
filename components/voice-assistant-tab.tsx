"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, Send } from "lucide-react"
import { useVoiceAssistant } from "@/contexts/voice-assistant-context"

export function VoiceAssistantTab() {
  const { isListening, lastCommand, response, startListening, stopListening } = useVoiceAssistant()
  const [inputText, setInputText] = useState("")

  const handleSend = () => {
    if (inputText.trim()) {
      // Process the text command
      // In a real app, you'd call an API or use the VoiceAssistant's processCommand method
      console.log("Processing command:", inputText)
      setInputText("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Voice Assistant
          <Button variant="outline" size="icon" onClick={() => (isListening ? stopListening() : startListening())}>
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lastCommand && (
            <div>
              <strong>You said:</strong> {lastCommand}
            </div>
          )}
          {response && (
            <div>
              <strong>Assistant:</strong> {response}
            </div>
          )}
          <div className="flex space-x-2">
            <Input
              placeholder="Type a command..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

