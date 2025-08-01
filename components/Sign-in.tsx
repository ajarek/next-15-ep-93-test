
import { signIn } from "@/app/api/auth/auth"
import { Button } from "./ui/button"
import { Github } from "lucide-react"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <Button type="submit" className='cursor-pointer'><Github/>Signin with GitHub</Button>
    </form>
  )
} 