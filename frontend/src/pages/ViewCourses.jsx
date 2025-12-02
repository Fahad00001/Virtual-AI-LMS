import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaStar, FaLock, FaLockOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import img from "../assets/empty.jpg";
import axios from "axios";
import { serverUrl } from "../App";
import Card from "../components/Card";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ViewCourses = () => {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate();
    const { courseData, selectedCourse } = useSelector((state) => state.course);
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [creatorData, setCreatorData] = useState(null)
    const [craetorCourses, setCreatorCourses] = useState(null)
    const [isEnrolled, setIsEnrolled] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)


    // ✅ Fetch selected course
    const fetchCourseData = async () => {
        if (courseData && courseData.length > 0) {
            const course = courseData.find((course) => course._id === courseId);
            if (course) {
                dispatch(setSelectedCourse(course));
            }
        }
    };

    useEffect(() => {

        const handleCreator = async () => {
            if (selectedCourse?.creator) {
                try {
                    const result = await axios.post(serverUrl + "/api/course/creator", { userId: selectedCourse?.creator }, { withCredentials: true })
                    console.log(result.data);
                    setCreatorData(result.data)

                } catch (error) {
                    console.log(error);


                }

            }


        }
        handleCreator()
    }, [selectedCourse])

    const checkenrollment = async () => {
        const verify = userData?.enrolledCourses?.some(c => (typeof c === "string" ? c : c._id).toString() === courseId?.toString()
        )
        if (verify) {
            setIsEnrolled(true)
        }
    }

    useEffect(() => {
        fetchCourseData();
        checkenrollment()
    }, [courseData, courseId, userData]);

    // ✅ Calculate discounted price dynamically
    // const getDiscountedPrice = (price, discountPercent = 10) => {
    //     if (!price || isNaN(price)) return "Free";
    //     const discount = (price * discountPercent) / 100;
    //     return (price - discount).toFixed(2);
    // };


    useEffect(() => {
        if (creatorData?._id && courseData.length > 0) {
            const creatorCourse = courseData.filter((course) => course.creator === creatorData?._id && course._id !== courseId)
            setCreatorCourses(creatorCourse)
        }
        // setCreatorCourses(creatorCourse)

    }, [creatorData, courseData])

    const handleEnroll = async (userId, courseId) => {
        try {
            const orderData = await axios.post(serverUrl + "/api/order/razorpay-order", { userId, courseId }, { withCredentials: true })
            console.log(orderData)
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderData.data.amount,
                currency: 'INR',
                name: "VIRTUAL COURSES",
                description: "COURSE ENROLLMENT PAYMENT",
                order_id: orderData.data.id,
                handler: async function (response) {
                    console.log("Razorpay response", response);

                    try {
                        const verifyPayment = await axios.post(serverUrl + "/api/order/verifypayment", {
                            ...response,
                            courseId,
                            userId
                        }, { withCredentials: true })
                        setIsEnrolled(true)
                        toast.success(verifyPayment.data.message)

                    } catch (error) {
                        toast.error(error.response.data.message)
                    }

                }

            }
            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (error) {
            // console.log(error);
            toast.error("something went wrong")

        }
    }

    const handleReview = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + '/api/review/createreview', { rating, comment, courseId }, { withCredentials: true })
            setLoading(false)
            toast.success("Review added")
            console.log(result.data);
            setRating(0)
            setComment("")





        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error(error.response.data.message)
            setRating(0)
            setComment("")

        }
    }

    const calculateAverageReview = (reviews) => {
        if (!reviews || reviews.length == 0) {
            return 0

        }
        const total = reviews.reduce((sum, review) => sum + review.rating, 0)
        return (total / reviews.length).toFixed(1)


    }

    const avgRating=calculateAverageReview(selectedCourse?.reviews)
    // console.log("avg rating: ",avgRating);
    
    
    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 relative">
                {/* Back button */}
                <div className="flex items-center mb-6">
                    <FaArrowLeft
                        className="text-gray-700 w-6 h-6 cursor-pointer hover:text-blue-600 transition"
                        onClick={() => navigate("/")}
                    />
                    <h1 className="ml-4 text-2xl font-bold text-gray-800">
                        {selectedCourse?.title || "Course Details"}
                    </h1>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Thumbnail */}
                    <div className="relative group">
                        {selectedCourse?.thumbnail ? (
                            <img
                                src={selectedCourse.thumbnail}
                                className="rounded-2xl w-full h-64 object-cover shadow-md group-hover:opacity-90 transition"
                                alt="Course Thumbnail"
                            />
                        ) : (
                            <img
                                src={img}
                                className="rounded-2xl w-full h-64 object-cover shadow-md"
                                alt="Default Thumbnail"
                            />
                        )}
                    </div>

                    {/* Course Info */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-gray-800">
                            {selectedCourse?.title || "Untitled Course"}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {selectedCourse?.description ||
                                "No description available for this course."}
                        </p>

                        <div className="flex items-center gap-3 text-yellow-500">
                            {/* <FaStar /> */}
                            <span className="flex items-center justify-start gap-1"><FaStar/>{avgRating}</span>
                            <span className="text-gray-400">(12,000)</span>
                           
                        </div>

                        {/* ✅ Price with dynamic discount */}
                        <div className="text-lg font-semibold text-blue-600">
                            {/* <span>₹ {getDiscountedPrice(selectedCourse?.price, 10)}</span> */}
                            {selectedCourse?.price && (
                                <>
                                    <span className="ml-2 text-3xl text-gray-400">
                                        ₹ {selectedCourse.price}
                                    </span>
                                    <span className="ml-2 text-green-600 text-sm font-medium">
                                        (10% OFF)
                                    </span>
                                </>
                            )}
                        </div>

                        <ul className="text-sm text-gray-700 space-y-1 pt-2">
                            <li>✅ 10+ hours of video content</li>
                            <li>✅ Lifetime access to course materials</li>
                        </ul>

                        {!isEnrolled ? <button
                            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow hover:bg-blue-700 transition"
                            onClick={() => handleEnroll(userData._id, courseId)}
                        >
                            Enroll Now
                        </button> : <button
                            className="mt-4 px-6 py-3 bg-green-100 text-green-500 rounded-xl font-medium shadow hover:bg-gray-700 transition"
                            onClick={() => navigate(`/viewlecture/${courseId}`)}
                        >
                            Watch Now
                        </button>}
                    </div>
                </div>

                {/* ✅ Extra Info */}
                <div className="mt-8 border-t pt-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        What you will learn
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Learn {selectedCourse?.category} from beginning</li>
                    </ul>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Who this course is for
                        </h2>
                        <p className="text-gray-700">
                            Beginners, aspiring developers, and professionals looking to
                            upgrade their skills.
                        </p>
                    </div>

                    {/* ✅ Course Curriculum */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="bg-white w-full md:w-2/5 p-6 mt-5 rounded-2xl shadow-lg border border-gray-200">
                            <h2 className="text-xl font-bold mb-2 text-gray-800">
                                Course curriculum
                            </h2>
                            <p>{selectedCourse?.lectures?.length} Lectures</p>

                            <div className="flex flex-col gap-3 mt-4">
                                {selectedCourse?.lectures?.map((lecture, index) => (
                                    <button
                                        key={index}
                                        disabled={!lecture.isPreviewFree}
                                        onClick={() => {
                                            if (lecture?.isPreviewFree) {
                                                setSelectedLecture(lecture);
                                            }
                                        }}
                                        className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200 text-left ${lecture?.isPreviewFree
                                            ? "hover:bg-gray-100 cursor-pointer border-gray-300"
                                            : "cursor-not-allowed opacity-60 border-gray-200"
                                            }`}
                                    >
                                        <span>{lecture?.lectureTitle}</span>
                                        {lecture?.isPreviewFree ? (
                                            <FaLockOpen className="text-green-500" />
                                        ) : (
                                            <FaLock className="text-gray-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* right div  */}
                        <div className=" mt-[20px] bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200">
                            <div className="aspect-video w-full rounded-lg overflow-hiddenmb-4 bg-black flex items-center justify-center">
                                {selectedLecture?.videoUrl ? <video className="w-full h-full object-cover " src={selectedLecture?.videoUrl} controls /> : <span className="text-white text-sm ">Select a preview lecture to watch</span>}
                            </div>
                        </div>

                    </div>
                </div>
                {/* reviews  */}

                {/* <div className="mt-8 border-t  pt-6">
            <h2 className="text-xl  font-semibold mb-2 ">Write a reviews</h2>
            <div className="mb-4">
                <div className="flex gap-1 mb-2">
                    {
                        [1,2,3,4,5].map((star)=>{
                            <FaStar key={star} className="fill-amber-300"/>

                        })
                    }
        </div>
    </div>
        </div> */}


                {/* ✅ Reviews Section  */}
                {/* ✅ Reviews Section (Static) */}
                <div className="mt-8 border-t pt-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Write a Review
                    </h2>

                    {/* ⭐ Static Star Rating */}
                    {/* ⭐ Static Star Rating with map */}
                    <div className="flex gap-2 mb-4">
                        {
                            [1, 2, 3, 4, 5].map((star) => (
                                <FaStar onClick={() => setRating(star)} className={star <= rating ? "fill-amber-300" : "fill-gray-300"} key={star} />
                            ))
                        }
                    </div>


                    {/* Review Input */}
                    <textarea
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        rows="4"
                        placeholder="Share your thoughts about this course..."
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>

                    <button disabled={loading} onClick={handleReview} className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                        {loading ? <ClipLoader size={30} color="white" /> : " Submit Review"}
                    </button>
                </div>

                {/* for cretor info  */}

                <div className="flex items-center pt-4 mt-8 border-t  gap-4 ">
                    {creatorData?.photoUrl ? <img src={creatorData?.photoUrl} alt="" className="  border-gray-200 border-1 w-16 h-16 rounded-full object-cover" /> : <img src={img} alt="" className="w-16 border-1 border-gray-200  h-16 rounded-full object-cover" />}
                    <div>
                        <h2 className="text-lg font-semibold">{creatorData?.name}</h2>
                        <p className="md:text-sm text-gray-600  text-[10px]">{creatorData?.description}</p>
                        <p className="md:text-sm text-gray-600  text-[10px]">{creatorData?.email}</p>
                    </div>

                </div>

                <div>
                    <p className="text-xl font-semibold mb-2 mt-6">Other Published Courses by the Educator -</p>
                </div>

                <div className="w-full transition-all duration-200 py-[20px] flex items-center justify-center lg:justify-center flex-wrap gap-6 lg:px-[80px]">
                    {
                        craetorCourses?.map((course, index) => (
                            <Card thumbnail={course.thumbnail} id={course._id} price={course.price} title={course.title} category={course.category} key={index} />
                        ))
                    }
                </div>


            </div>
        </div>
    );
};

export default ViewCourses;
