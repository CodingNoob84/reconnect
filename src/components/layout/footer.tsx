import { Instagram, Twitter, Mail, Globe } from "lucide-react";

import { Button } from "../ui/button";

import { Link } from "@tanstack/react-router";

import { Separator } from "../ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-background pb-10 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <Separator className="mb-10 opacity-50" />

        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-center md:justify-between md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Link to="/" className="group">
              <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                Re
                <span className="italic text-primary">Connect</span>
              </h3>
            </Link>

            <p className="max-w-xs text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/60 sm:text-[11px]">
              Preserving Legacy. Building Connections.
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center justify-center gap-2">
            {[Instagram, Twitter, Mail, Globe].map((Icon, i) => (
              <Button
                key={i}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-primary/5 text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground sm:h-10 sm:w-10"
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex flex-wrap items-center justify-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground sm:gap-8 sm:text-[11px]">
              <Link to="/" className="transition-colors hover:text-primary">
                Privacy
              </Link>

              <Link to="/" className="transition-colors hover:text-primary">
                Terms
              </Link>

              <Link to="/" className="transition-colors hover:text-primary">
                Contact
              </Link>
            </div>

            <p className="text-center text-[10px] font-medium leading-relaxed text-muted-foreground/50 md:text-right">
              © 2026 RECONNECT.
              <br className="sm:hidden" /> Crafted for Alumni.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
