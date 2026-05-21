import { Instagram, Twitter, Mail, Globe } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "@tanstack/react-router"
import { Separator } from "../ui/separator"

export const Footer = () => {
  return (
    <footer className="bg-background pb-12 pt-6">
      <div className="mx-auto max-w-360 px-6 lg:px-12">
        <Separator className="mb-12 opacity-50" />
        
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          
          {/* 1. Brand Section */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link to="/" className="group">
              <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                Re<span className="italic text-primary">Connect</span>
              </h3>
            </Link>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground/60">
              Preserving Legacy. Building Connections.
            </p>
          </div>

          {/* 2. Compact Socials */}
          <div className="flex items-center gap-2">
            {[Instagram, Twitter, Mail, Globe].map((Icon, i) => (
              <Button
                key={i}
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>

          {/* 3. Legal & Bottom Links */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
              <Link to="/" className="transition-colors hover:text-primary">Privacy</Link>
              <Link to="/" className="transition-colors hover:text-primary">Terms</Link>
              <Link to="/" className="transition-colors hover:text-primary">Contact</Link>
            </div>
            <p className="text-[10px] font-medium text-muted-foreground/50">
              © 2026 RECONNECT. CRAFTED FOR ALUMNI.
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}