import { signIn } from "@/app/api/auth/auth"
import { Button } from "./ui/button"
import { FcGoogle } from "react-icons/fc";
 
export default function SignInGoogle() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button type="submit" className='cursor-pointer'><FcGoogle /> Signin with Google</Button>
    </form>
  )
} 