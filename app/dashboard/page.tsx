"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Brain,
  Upload,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  Home,
  BookOpen,
  Search,
  Lightbulb,
  FileVideo,
  CreditCard,
} from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { useRouter } from "next/navigation"
import SyllabusUploader from "../../components/SyllabusUploader"
import ChapterBreakdown from "../../components/ChapterBreakdown"
import { db } from "../../firebase/config"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [syllabuses, setSyllabuses] = useState<any[]>([])
  const [syllabusLoading, setSyllabusLoading] = useState(false)
  const [syllabusError, setSyllabusError] = useState("")
  const [refresh, setRefresh] = useState(0)
  const [breakdowns, setBreakdowns] = useState<any[]>([])
  const [selectedBreakdown, setSelectedBreakdown] = useState<any | null>(null)
  const [loadingBreakdowns, setLoadingBreakdowns] = useState(false)
  const [breakdownError, setBreakdownError] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const fetchSyllabuses = async (uid: string) => {
    setSyllabusLoading(true)
    setSyllabusError("")
    try {
      const q = query(
        collection(db, "syllabuses"),
        where("userId", "==", uid),
        orderBy("createdAt", "desc")
      )
      const querySnapshot = await getDocs(q)
      setSyllabuses(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    } catch (err: any) {
      setSyllabusError(err.message || "Failed to fetch syllabuses.")
    } finally {
      setSyllabusLoading(false)
    }
  }

  useEffect(() => {
    if (!loading && user) {
      fetchSyllabuses(user.uid)
    }
  }, [user, loading, refresh])

  // Fetch all syllabusBreakdowns for the user
  const fetchBreakdowns = async (uid: string) => {
    setLoadingBreakdowns(true)
    setBreakdownError("")
    try {
      const q = query(
        collection(db, "syllabusBreakdowns"),
        where("userId", "==", uid),
        orderBy("createdAt", "desc")
      )
      const querySnapshot = await getDocs(q)
      const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      console.log('Fetched breakdowns:', docs)
      setBreakdowns(docs)
      if (docs.length > 0) {
        console.log('Setting selected breakdown:', docs[0])
        setSelectedBreakdown(docs[0])
      } else {
        setSelectedBreakdown(null)
      }
    } catch (err: any) {
      console.error(err);
      setBreakdownError(err.message || "Failed to fetch past chats.")
    } finally {
      setLoadingBreakdowns(false)
    }
  }

  useEffect(() => {
    if (!loading && user) {
      fetchBreakdowns(user.uid)
    }
  }, [user, loading, refresh])

  // Debug logging for selectedBreakdown
  useEffect(() => {
    if (selectedBreakdown) {
      console.log('Selected breakdown:', selectedBreakdown)
      console.log('Breakdown chapters:', selectedBreakdown.breakdown)
    }
  }, [selectedBreakdown])

  if (loading) return <div>Loading...</div>
  if (!user) return null

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  // Get user display name or fallback to email
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Pass a callback to SyllabusUploader to trigger refresh after upload
  const handleSyllabusUploaded = () => setRefresh((r) => r + 1);

  return (
    <div className="min-h-screen bg-[#E7E8D1]">
      {/* Header */}
      <header className="bg-[#E7E8D1]/80 border-b border-[#6B9080] sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#B85042] rounded-lg flex items-center justify-center logo-animation">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#B85042] brand-text-animation">IntelliLearn</span>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#B85042] text-white hover:bg-[#6B9080] hover:text-[#B85042] transition-colors text-lg font-semibold">
              <Users className="h-4 w-4 text-white" />
              <span>My Groups</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#6B9080]/30 text-[#B85042] hover:text-[#6B9080] transition-colors"
              >
                <div className="w-8 h-8 bg-[#B85042] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{initials}</span>
                </div>
                <span className="text-[#B85042]">{displayName}</span>
                <ChevronDown className="h-4 w-4 text-[#6B9080]" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#6B9080] py-2">
                  <button className="flex items-center space-x-2 px-4 py-2 text-[#B85042] hover:bg-[#E7E8D1] w-full text-left">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-[#B85042] hover:bg-[#E7E8D1] w-full text-left">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar: Past Chats */}
        <aside className="w-72 bg-white border-r border-[#6B9080] min-h-screen flex flex-col">
          <div className="p-6 border-b border-[#6B9080]">
            <h3 className="text-lg font-semibold text-[#B85042] mb-4">Past Chats</h3>
            {loadingBreakdowns ? (
              <div className="text-[#B85042]/80">Loading...</div>
            ) : breakdownError ? (
              <div className="text-red-600">{breakdownError}</div>
            ) : breakdowns.length === 0 ? (
              <div className="text-[#B85042]/80">No past chats yet.</div>
            ) : (
              <ul className="space-y-2">
                {breakdowns.map((b) => (
                  <li key={b.id}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors border border-[#6B9080] ${selectedBreakdown?.id === b.id ? "bg-[#E7E8D1] text-[#B85042] font-semibold" : "hover:bg-[#6B9080]/10 text-black/80"}`}
                      onClick={() => setSelectedBreakdown(b)}
                    >
                      <div className="truncate font-bold">{b.title}</div>
                      <div className="text-xs text-[#6B9080] truncate">{b.createdAt?.toDate?.().toLocaleString?.() || ""}</div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[#B85042] mb-2 animate-fade-in-word">Welcome back, {displayName}!</h1>
              <p className="text-xl text-[#B85042]/80">Ready to continue your learning journey?</p>
            </div>

            <div className="space-y-8">
              {/* Syllabus Upload Section */}
              <div className="bg-[#E7E8D1] rounded-xl p-6 shadow-sm">
                <SyllabusUploader onSyllabusUploaded={handleSyllabusUploaded} />
              </div>

              {/* Chapter Breakdown */}
              {selectedBreakdown ? (
                <div className="bg-white rounded-xl border border-[#6B9080] p-6 shadow-sm hover:shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-[#B85042] mb-2 animate-fade-in-word">
                        {selectedBreakdown.title || "Syllabus"}
                      </h2>
                      <p className="text-[#6B9080]">
                        {selectedBreakdown.createdAt?.toDate?.().toLocaleString?.() || ""}
                      </p>
                    </div>
                  </div>
                  <ChapterBreakdown chapters={selectedBreakdown.breakdown} key={selectedBreakdown.id} />
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-[#6B9080] p-12 text-center shadow-sm">
                  <BookOpen className="h-16 w-16 text-[#B85042] mx-auto mb-4 logo-animation" />
                  <h3 className="text-2xl font-bold text-[#B85042] mb-2 brand-text-animation">No Syllabus Selected</h3>
                  <p className="text-[#B85042]/80 mb-4">Select a past chat or upload a new syllabus to get started.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
