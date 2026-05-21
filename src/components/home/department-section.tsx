import { Building2, Cog, Laptop, Radio, Zap, ArrowRight } from "lucide-react"
import { Card, CardContent } from "../ui/card"

const departments = [
  {
    icon: Cog,
    title: 'Mechanical',
    stat: '75',
    description: 'Designing machines and industrial systems.',
  },
  {
    icon: Radio,
    title: 'Electronics',
    stat: '74',
    description: 'Embedded tech and modern electronics.',
  },
  {
    icon: Zap,
    title: 'Electrical',
    stat: '72',
    description: 'Power systems and automation solutions.',
  },
  {
    icon: Laptop,
    title: 'Computer Science',
    stat: '73',
    description: 'AI systems and digital experiences.',
  },
  {
    icon: Building2,
    title: 'Civil',
    stat: '10',
    description: 'Sustainable infra and landmark structures.',
  },
]

export const DepartmentsSection = () => {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden bg-background">
      {/* Subtle Background Text/Accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20rem] font-serif font-bold text-primary/5 select-none pointer-events-none">
        Legacy
      </div>

      <div className="mx-auto max-w-360 px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 md:flex md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
              Departments
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Our Academic <span className="italic text-primary/80">Legacy.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-muted-foreground font-medium md:max-w-xs border-l-2 border-primary/20 pl-6">
            A diverse network of experts across five core engineering disciplines.
          </p>
        </div>

        {/* 5-Column Grid Implementation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 xl:gap-6">
          {departments.map((item) => {
            const Icon = item.icon

            return (
              <Card
                key={item.title}
                className="group relative h-full rounded-[3rem] border-none bg-background/50 p-1 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 ring-1 ring-border/50"
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Icon Area */}
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Stat Area */}
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-bold text-foreground">
                      {item.stat}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Alumni</span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground/80 grow">
                    {item.description}
                  </p>

                  {/* Minimal Interaction Indicator */}
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/0 transition-all duration-500 group-hover:text-primary">
                    View Network <ArrowRight className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}