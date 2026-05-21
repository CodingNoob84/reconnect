import { MapPin, Sparkles } from "lucide-react"
import { Card, CardContent } from "../ui/card"

const events = [
  {
    month: 'May',
    day: '23',
    title: "Alumni Networking Gala",
    location: 'Main Engineering Hall',
  },
 
]

export const EventsSection = () => {
  // Hide section if no events exist
  if (!events || events.length === 0) return null

  // Slice to show max 3 events
  const displayEvents = events.slice(0, 3)

  return (
    <section className="relative overflow-hidden py-12 md:py-24 bg-background">
      {/* Background Glow */}
      <div className="absolute right-0 top-0 -z-10 h-125 w-125 bg-primary/5 blur-[120px] rounded-full" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Upcoming Events
          </div>
          <h2 className="mt-4 font-serif text-4xl font-black leading-[1.15] tracking-tight text-foreground md:text-5xl">
            Campus Events <br />
            <span className="italic text-primary/80">& Reunions.</span>
          </h2>
        </div>

        {/* Event Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayEvents.map((event, i) => (
            <Card
              key={i}
              className="group relative overflow-hidden rounded-4xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
            >
              <CardContent className="flex items-center gap-6 p-6 md:p-8">
                {/* Modern Date Box */}
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/10 transition-transform duration-500 group-hover:scale-105">
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] opacity-90">
                    {event.month}
                  </span>
                  <span className="text-2xl font-bold tracking-tighter mt-0.5">{event.day}</span>
                </div>

                {/* Content Details Block */}
                <div className="flex flex-col min-w-0 py-0.5">
                  <h3 className="font-serif text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-300 truncate-2-lines">
                    {event.title}
                  </h3>
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </CardContent>
              
              {/* Decorative Accent visible on hover */}
              <div className="absolute top-0 right-0 h-20 w-20 bg-primary/5 rounded-bl-full translate-x-10 -translate-y-10 transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-3" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}