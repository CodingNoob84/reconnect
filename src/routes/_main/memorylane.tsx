import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Filter,
  Users,
  Image as ImageIcon,
  Camera,
} from 'lucide-react'

export const Route = createFileRoute('/_main/memorylane')({
  component: MemoryLanePage,
})

function MemoryLanePage() {
  const collections = [
    {
      id: 'october-2024',
      month: 'October',
      year: '2024',
      title: 'October 2024 Collection',
      description: 'Gold leaves and evening seminars.', // Shortened
      uploadedBy: 'Elena Rodriguez',
      imageCount: 12,
      images: [
        { id: 1, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', title: 'Homecoming Morning', span: 'single' },
        { id: 2, url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', title: 'The Quiet Corner', span: 'large' },
        { id: 3, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c', title: 'Evening Seminar', span: 'single' },
      ],
    },
    {
      id: 'september-2024',
      month: 'September',
      year: '2024',
      title: 'September 2024 Collection',
      description: '', // Empty description
      uploadedBy: 'David Chen',
      imageCount: 8,
      images: [
        { id: 4, url: 'https://images.unsplash.com/photo-1523050335456-c6d70740d1a7', title: 'Lunch Rush Echoes', span: 'full' },
        { id: 5, url: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3', title: 'The Central Quad', span: 'half' },
      ],
    },
    {
      id: 'august-2024',
      month: 'August',
      year: '2024',
      title: 'August 2024 Collection',
      description: 'The final heatwave before the halls filled again. Quiet campus energy.',
      uploadedBy: 'Jameson Lee',
      imageCount: 5,
      images: [
        { id: 6, url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655', title: 'Summer Research', span: 'single' },
        { id: 7, url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846', title: 'Empty Cafe', span: 'single' },
      ],
    },
    {
      id: 'july-2024',
      month: 'July',
      year: '2024',
      title: 'July 2024 Collection',
      description: 'Internship season.',
      uploadedBy: 'Kira Vance',
      imageCount: 14,
      images: [
        { id: 8, url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173', title: 'Desk Views', span: 'large' },
        { id: 9, url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', title: 'City Commute', span: 'single' },
        { id: 10, url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b', title: 'Workshop Days', span: 'single' },
      ],
    },
  ]

  const getImageSpanClass = (span: string) => {
    switch (span) {
      case 'large': return 'row-span-2 min-h-[500px]'
      case 'full': return 'md:col-span-2 aspect-[21/9]'
      case 'half': return 'aspect-video'
      default: return 'aspect-[4/3]'
    }
  }

  const scrollToCollection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Hero Section */}
     <section className="mb-16">
  <div className="text-center max-w-2xl mx-auto space-y-4">
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
      <Camera className="h-3 w-3" />
      Visual Archive • {collections.length} Collections
    </div>
    <h1 className="font-serif text-5xl font-bold text-stone-800 tracking-tight md:text-6xl">
      The Memory <span className="italic text-primary">Lane</span>
    </h1>
    <p className="text-lg text-stone-500 font-medium leading-relaxed">
      Every graduate leaves a story behind—a captured fragment of light, 
      a quiet morning in the library, or the electric energy of the quad. 
      Scroll to relive the eras.
    </p>
    
    {/* Controls Row */}
    <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
      <Button className="h-14 rounded-2xl gap-2">
        <Plus className="h-4 w-4" />
        Add a Moment
      </Button>

      <Button 
        variant="outline"
        className="h-14 rounded-2xl gap-2"
      >
        <Filter className="h-4 w-4" />
        Filter Eras
      </Button>
    </div>
  </div>
</section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          
          {/* Navigation Sidebar */}
          <aside className="hidden lg:block lg:col-span-2 sticky top-24 self-start">
            <nav className="flex flex-col gap-8 border-l-2 border-stone-100 pl-6">
              {collections.map((c) => (
                <button
                  key={c.id}
                  onClick={() => scrollToCollection(c.id)}
                  className="text-left group"
                >
                  <span className="block text-xs font-bold text-stone-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                    {c.month}
                  </span>
                  <span className="block text-xl font-serif italic text-stone-900">
                    {c.year}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Vertical Stream */}
          <div className="lg:col-span-10 space-y-40 pb-32">
            {collections.map((collection, index) => (
              <section 
                key={collection.id} 
                id={collection.id}
                className="grid grid-cols-1 xl:grid-cols-10 gap-12 items-start scroll-mt-24"
              >
                {/* Info Block */}
                <div className={`xl:col-span-3 space-y-6 ${index % 2 !== 0 ? 'xl:order-last' : ''}`}>
                  <div className="space-y-2">
                    <h2 className="font-serif text-3xl font-bold text-stone-900">
                      {collection.month} {collection.year}
                    </h2>
                    {collection.description && (
                      <p className="text-stone-500 leading-relaxed italic border-l-2 border-stone-200 pl-4">
                        {collection.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-4">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase text-stone-400 tracking-tighter">
                      <Users className="w-3 h-3" />
                      <span>{collection.uploadedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase text-stone-400 tracking-tighter">
                      <ImageIcon className="w-3 h-3" />
                      <span>{collection.imageCount} Photos</span>
                    </div>
                  </div>
                </div>

                {/* Mosaic Gallery */}
                <div className="xl:col-span-7">
                  <div className="grid grid-cols-2 gap-4">
                    {collection.images.map((image) => (
                      <div
                        key={image.id}
                        className={`group relative bg-stone-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl ${getImageSpanClass(image.span)}`}
                      >
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                           <p className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/40 pb-1">
                             {image.title}
                           </p>
                        </div>
                      </div>
                    ))}
                    <div className="bg-stone-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-200 hover:border-stone-400 transition-colors cursor-pointer aspect-square">
                      <Plus className="w-6 h-6 text-stone-300" />
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

       
      </main>
  )
}