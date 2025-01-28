import { VoiceAssistantProvider } from "@/contexts/voice-assistant-context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <VoiceAssistantProvider>{children}</VoiceAssistantProvider>
      </body>
    </html>
  )
}

