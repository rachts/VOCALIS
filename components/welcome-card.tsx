import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function WelcomeCard() {
  return (
    <Card className="bg-gradient-to-r from-purple-500/10 to-purple-500/5">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">A</div>
        <div>
          <h2 className="text-lg font-semibold">HELLO USER</h2>
          <p className="text-sm text-muted-foreground">GOOD MORNING</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-32 flex items-center justify-center bg-muted/50 rounded-lg">
          <div className="w-16 h-16 flex items-center justify-center">
            <div className="w-8 h-8 bg-muted-foreground/20" />
            <div className="w-8 h-8 bg-muted-foreground/20 rotate-45 absolute" />
            <div className="w-8 h-8 bg-muted-foreground/20 rounded-full absolute" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">QUOTE OF THE DAY</h3>
          <p className="text-sm text-muted-foreground">SOMETHING INSPIRATIONAL</p>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          <div className="flex gap-2">
            <Button variant="outline">Enabled</Button>
            <Button className="bg-purple-600">Enabled</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

