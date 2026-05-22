import { Link } from "@tanstack/react-router";
import {
  Menu,
  LogOut,
  LayoutDashboard,
  Users,
  BookOpen,
  UserCircle2,
} from "lucide-react";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { authQueries } from "#/query/auth";
import { LogOutButton } from "./auth-buttons";

export const Navbar = () => {
  const { data } = useQuery(authQueries.user());
  const isAuthenticated = data?.isAuthenticated;
  const user = data?.user;

  // Dynamically generate navigation items based on authentication status
  const navItems = [
    { title: "Home", icon: LayoutDashboard, href: "/" },
    { title: "Directory", icon: Users, href: "/directory" },
    { title: "Blackboard", icon: UserCircle2, href: "/blackboard" },
    { title: "Memory Lane", icon: BookOpen, href: "/memorylane" },
    ...(isAuthenticated
      ? [{ title: "My Profile", icon: BookOpen, href: "/myprofile" }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo - Fixed width and height */}
        <div className="flex items-center justify-start min-w-30">
          <Link to="/" className="group flex items-center gap-2">
            <div className="rounded-xl p-1 shadow-sm">
              <img
                src="/images/logo.png"
                alt="ReConnect Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <h1 className="font-serif text-2xl font-black tracking-tight text-foreground">
              Re
              <span className="italic text-primary transition-colors duration-300 group-hover:text-primary/80">
                Connect
              </span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center justify-center gap-1 md:flex md:flex-nowrap h-full mx-4">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              activeProps={{
                className: "text-primary bg-primary/5 [font-weight:700]",
              }}
              inactiveProps={{
                className:
                  "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              }}
              className="relative flex h-12 items-center justify-center px-4 text-sm font-medium transition-all duration-200 rounded-lg group whitespace-nowrap"
            >
              <span className="relative z-10">{item.title}</span>

              {/* Premium Active/Hover Line Indicator */}
              <div className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary scale-x-0 transition-transform duration-300 origin-center group-hover:scale-x-50 group-[.active]:scale-x-100 group-[.active]:bg-primary" />
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 min-w-30">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {/* User Profile Info */}
              <div className="hidden flex-col items-end text-right md:flex whitespace-nowrap">
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  {user?.name}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
                  Alumni
                </span>
              </div>

              {/* Avatar Wrapper */}
              <Avatar className="h-10 w-10 ring-2 ring-primary/10 transition-all duration-300 hover:scale-105 hover:ring-primary/40 cursor-pointer shadow-sm">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary/5 text-xs font-bold text-primary">
                  AR
                </AvatarFallback>
              </Avatar>

              {/* Logout Button */}
              <LogOutButton />
            </div>
          ) : (
            <Link to="/login">
              <Button className="rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:brightness-110 transition-all duration-200 whitespace-nowrap">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Sheet Trigger */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-muted/50 hover:bg-muted border border-border/50"
                >
                  <Menu className="h-5 w-5 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-75 flex-col justify-between bg-background/95 p-6 backdrop-blur-md"
              >
                <div className="space-y-8">
                  <SheetHeader>
                    <SheetTitle className="text-left font-serif text-2xl font-black">
                      Re<span className="italic text-primary">Connect</span>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Navigation Links */}
                  <nav className="space-y-1.5">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          to={item.href}
                          activeProps={{
                            className:
                              "bg-primary text-primary-foreground shadow-md shadow-primary/10 font-semibold",
                          }}
                          inactiveProps={{
                            className:
                              "text-muted-foreground hover:bg-muted hover:text-foreground",
                          }}
                          className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200"
                        >
                          <Icon className="h-5 w-5 stroke-2" />
                          {item.title}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Mobile Drawer Footer with Profile & Logout */}
                {isAuthenticated && (
                  <div className="border-t border-border/60 pt-4 space-y-4">
                    <div className="flex items-center gap-3 px-2">
                      <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>AR</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">
                          {user?.name}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80">
                          Alumni
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full bg-red-500/80 justify-center gap-2 rounded-xl font-medium shadow-sm"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
