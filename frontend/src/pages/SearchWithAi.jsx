import React, { useState } from 'react'
import { FaArrowLeft, FaMicrophone, FaSearch } from 'react-icons/fa'
import ai from "../assets/ai.png"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'
import start from "../assets/start.mp3"

const SearchWithAi = () => {
    const startSound = new Audio(start)
    const navigate = useNavigate()
    const [input, setInput] = useState("")
    const [recommendation, setRecommendation] = useState([])
    const [listening, setListening] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)

    function speak(message) {
        let utterance = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterance)
    }

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = SpeechRecognition ? new SpeechRecognition() : null

    const handleMicSearch = () => {
        if (!recognition) {
            toast.error("Speech recognition not supported in this browser")
            return
        }

        setListening(true)
        recognition.start()
        startSound.play()

        recognition.onresult = async (e) => {
            const transcript = String(e.results[0][0].transcript || "")
                .replace(/\s+/g, " ")
                .replace(/[.,!?;:]+$/, "")
                .trim()
            setInput(transcript)
            await handleRecommendation(transcript)
        }

        recognition.onend = () => {
            setListening(false)
        }
    }

    const handleRecommendation = async (query) => {
        if (!query) {
            toast.warning("Please enter a search term")
            return
        }

        try {
            setHasSearched(true)
            const { data } = await axios.post(
                `${serverUrl}/api/course/search`,
                { input: query },
                { withCredentials: true }
            )
            console.log("API response:", data)

            setRecommendation(data.courses || [])
            if (data.courses && data.courses.length > 0) {
                speak("Here are some courses that might interest you")
            } else {
                speak("No courses found")
            }
        } catch (error) {
            console.error("Search error:", error)
            toast.error("Something went wrong. Try again later.")
        } finally {
            setListening(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-6">
            <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative">
                <FaArrowLeft
                    onClick={() => navigate("/")}
                    className="text-black w-[22px] h-[22px] cursor-pointer absolute left-4 top-6"
                />

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2">
                    <img
                        className="w-8 h-8 sm:w-[30px] sm:h-[30px]"
                        src={ai}
                        alt="ai-logo"
                    />
                    Search with <span className="text-pink-300">AI</span>
                </h1>

                {/* Input + Buttons */}
                <div className="flex items-center rounded-full overflow-hidden shadow-lg relative w-full bg-gray-700">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        placeholder="What do you want to learn? (e.g. AI, MERN, CLOUD...)"
                        type="text"
                        className="flex-grow px-3 sm:px-4 py-2 sm:py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
                    />

                    {/* Search Button */}
                    {input && (
                        <button
                            onClick={() => handleRecommendation(input)}
                            className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-600 transition"
                        >
                            <FaSearch className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    )}

                    {/* Mic Button */}
                    <button
                        onClick={handleMicSearch}
                        className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-600 transition"
                    >
                        <FaMicrophone className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>

            {/* ✅ Listening Message */}
            {listening && (
                <h1 className="text-xl text-center sm:text-2xl mt-10 text-pink-400 animate-pulse">
                    🎤 Listening...
                </h1>
            )}

            {/* ✅ Courses / Messages */}
            {!listening && recommendation.length > 0 ? (
                <div className="w-full max-w-6xl mt-12 px-2 sm:px-4">
                    <h1 className="text-xl text-center sm:text-2xl mt-10 font-semibold text-gray-200">
                        Ai Search Results
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        {recommendation.map((course) => (
                            <div
                                key={course._id}
                                onClick={() => navigate(`/viewcourse/${course._id}`)}
                                className="bg-white text-black p-5 rounded-2xl shadow-md hover:shadow-indigo-500/30 transition-all duration-200 border border-gray-200 cursor-pointer hover:bg-gray-200"
                            >
                                <h2 className="text-lg font-bold sm:text-xl">{course.title}</h2>
                                <p className="text-sm sm:text-base text-gray-600">
                                    {course.category || "No description available"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : !listening && hasSearched ? (
                <h1 className="text-xl text-center sm:text-2xl mt-10 text-gray-400">
                    No courses found
                </h1>
            ) : !listening && !hasSearched ? (
                <h1 className="text-xl text-center sm:text-2xl mt-10 text-gray-500">
                    No courses found yet
                </h1>
            ) : null}
        </div>
    )
}

export default SearchWithAi
