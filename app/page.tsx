import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['600']
});

export default function Home() {
  
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-400 to-pink-500">
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-6xl font-semibold text-white drop-shadow-lg",
          fontPoppins.className
        )}>
         🔅 Auth
        </h1>
        <p className="text-white text-lg">
          A Simple and secure <span className="inline-block bg-clip-text text-transparent bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black to-orange-500">Authentication System</span> using NextAuthV5.
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign In.
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
