import { DateTimeDisplay } from "@/components/date-time-display"
import { Notifications } from "@/components/notifications"
import { TodoList } from "@/components/todo-list"
import { WeatherCard } from "@/components/weather-card"
import { WelcomeCard } from "@/components/welcome-card"
import { VocalisOrb } from "@/components/vocalis-orb"
import { VoiceAssistantTab } from "@/components/voice-assistant-tab"
import { SearchBar } from "@/components/search-bar"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-800 p-4 relative">
      <div className="max-w-7xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4">
          <DateTimeDisplay />
          <WeatherCard temperature={27} location="Gonin Gora, Kad" date="Tuesday, 23 December" />
          <VoiceAssistantTab />
          <SearchBar />
        </div>
        <div className="space-y-4">
          <WelcomeCard />
          <TodoList />
        </div>
        <div>
          <Notifications />
        </div>
      </div>
      <VocalisOrb />
    </main>
  )
}

