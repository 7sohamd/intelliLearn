import Link from "next/link"
import { Brain, Users, Video, BookOpen, ArrowRight } from "lucide-react"
import { HeroHighlight } from "@/components/ui/hero-highlight"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export default function HomePage() {
  return (
    <HeroHighlight containerClassName="min-h-screen w-full bg-[#E7E8D1]" className={undefined}>
      {/* Navbar (full width) */}
      <nav className="w-full bg-[#E7E8D1]/80 backdrop-blur-sm border-b border-[#6B9080] sticky top-0 z-50">
        <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#B85042] rounded-lg flex items-center justify-center logo-animation">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#B85042] brand-text-animation">IntelliLearn</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-[#B85042] hover:text-[#6B9080] px-4 py-2 rounded-lg hover:bg-[#6B9080]/30 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#B85042] text-white px-4 py-2 rounded-lg hover:bg-[#6B9080] hover:text-[#B85042] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      <div className="relative w-full pt-8 overflow-hidden">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-center text-[#B85042] mb-6 hero-title">
              {[
                "IntelliLearn:",
                "Master",
                "Your",
                "Studies,",
                "Together"
              ].map((word, idx) => (
                <span
                  key={word + idx}
                  className="inline-block opacity-0 animate-fade-in-word"
                  style={{ animationDelay: `${0.2 * idx}s` }}
                >
                  {word} 
                </span>
              ))}
            </h1>
            <TextGenerateEffect words="Your AI-powered collaborative study platform." className="mx-auto max-w-2xl" colorClass="text-[#B85042]" />
            <p className="text-xl text-[#B85042]/80 mb-8 max-w-3xl mx-auto hero-subtitle">
              Transforming syllabuses into interactive, AI-powered knowledge — <span className="text-[#6B9080] font-bold text-2xl">TOGETHER</span> ✨
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center bg-[#B85042] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#6B9080] hover:text-[#B85042] transition-colors shadow-lg hover:shadow-xl hero-button"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Hero Illustration */}
          <div className="mt-16 flex justify-center">
            <div className="relative hero-illustration">
              <div className="w-64 h-64 rounded-full flex items-center justify-center animate-gradient-move shadow-brain-bg">
                <div className="relative animate-pulse-scale">
                  <Brain className="h-24 w-24 text-[#B85042]" />
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#B85042] rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="feature-highlights-z max-w mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#6B9080] hover:shadow-md transition-shadow feature-card" style={{ backgroundColor: '#E7E8D1' }}>
              <div className="w-12 h-12 bg-[#6B9080] rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold  mb-2">AI-Powered Knowledge Trees</h3>
              <p className="text-black/80">Transform your syllabus into interactive, visual knowledge structures.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#6B9080] hover:shadow-md transition-shadow feature-card" style={{ backgroundColor: '#E7E8D1' }}>
              <div className="w-12 h-12 bg-[#6B9080] rounded-lg flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Intelligent Video Summaries</h3>
              <p className="text-black/80">Get AI-generated summaries and key insights from educational videos.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#6B9080] hover:shadow-md transition-shadow feature-card" style={{ backgroundColor: '#E7E8D1' }}>
              <div className="w-12 h-12 bg-[#6B9080] rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Collaborative Study Spaces</h3>
              <p className="text-black/80">Study together with peers in shared, interactive learning environments.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#6B9080] hover:shadow-md transition-shadow feature-card" style={{ backgroundColor: '#E7E8D1' }}>
              <div className="w-12 h-12 bg-[#6B9080] rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold  mb-2">Personalized Study Tools</h3>
              <p className="text-black/80">Adaptive flashcards, quizzes, and study plans tailored to your progress.</p>
            </div>
          </div>
        </section>
        <div className="bottom-fade-gradient" />
      </div>
    </HeroHighlight>
  )
}
