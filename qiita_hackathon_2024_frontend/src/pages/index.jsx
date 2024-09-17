import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


export default function Index() {
  return (
    <div>
      ここから
      <Button variant="outline">Click me</Button>
      <Button variant="secondary">Secondary</Button>
      <Textarea placeholder="Type your message here." className="my_width" />
    </div>
  );
}
