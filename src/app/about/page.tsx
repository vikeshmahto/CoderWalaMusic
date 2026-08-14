import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: "About | Coder Wala Music",
  description: "Learn more about Coder Wala Music and why lofi is best for coding.",
}

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-y-auto">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 bg-black">
        <video
          src="/bg-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Player
        </Link>

        <section className="mb-12 backdrop-blur-xl bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide text-white drop-shadow-lg">
            About Coder Wala Music
          </h1>
          <p className="leading-relaxed text-white/80 text-lg">
            Coder Wala Music is designed specifically for programmers and developers who need uninterrupted, focus-enhancing background music. Whether you're debugging, writing complex algorithms, or trying to beat a deadline, our handpicked continuous lofi beats and coding vibes will keep you in the zone. Built with Next.js, tailored for the Indian dev community.
          </p>
        </section>

        <section className="backdrop-blur-xl bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 tracking-wide text-white drop-shadow-md">Frequently Asked Questions</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white/90 mb-3">What is the best music for coding?</h3>
            <p className="text-white/70 leading-relaxed">
              Instrumental tracks, especially lofi hip-hop and chillwave, are proven to boost concentration. By avoiding lyrics, you minimize cognitive load and stay focused on your code.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white/90 mb-3">Why do developers listen to Lofi?</h3>
            <p className="text-white/70 leading-relaxed">
              Lofi music creates a predictable, rhythmic background noise that helps block out distractions in the office or at home. It’s the ultimate "programmer background music" to achieve flow state.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
