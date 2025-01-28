import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const todos = [
  {
    id: 1,
    title: "Title Line I",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 2,
    title: "Title Line II",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 3,
    title: "Title Line III",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 4,
    title: "Title Line IV",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 5,
    title: "Title Line V",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    id: 6,
    title: "Title Line VI",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
]

export function TodoList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>To Do List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {todos.map((todo) => (
          <div key={todo.id} className="flex space-x-4">
            <Checkbox id={`todo-${todo.id}`} />
            <div className="space-y-1">
              <label
                htmlFor={`todo-${todo.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {todo.title}
              </label>
              <p className="text-sm text-muted-foreground">{todo.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

