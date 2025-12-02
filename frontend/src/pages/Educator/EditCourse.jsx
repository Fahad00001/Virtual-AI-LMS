import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/empty.jpg"; // fallback image
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice";

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch=useDispatch()
  const {courseData}=useSelector(state=>state.course)

  const [isPublished, setIsPublished] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState(img); // default image
  const [backendImage, setBackendImage] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isEditingThumbnail, setIsEditingThumbnail] = useState(false);

  const [loading1, setLoading1] = useState(false)

  const thumb = useRef();


  // ✅ Thumbnail Change Handler
const handleThumbnailChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setIsEditingThumbnail(true);

  const reader = new FileReader();
  reader.onload = (event) => {
    setPreviewImage(event.target.result);
    setThumbnailFile(file);
    console.log("Preview image set successfully");
  };
  reader.readAsDataURL(file);
};





 

 const getCourseById = async () => {
  if (isEditingThumbnail) return; // Prevent overwriting local preview

  try {
    const result = await axios.get(`/api/course/getcoursebyid/${courseId}`, {
      withCredentials: true,
    });

    const course = result.data;

    const updateData = result.data;
    if (updateData.isPublished) {
      const updateCourse = courseData.map((c) =>
        c._id === courseId ? updateData : c
      );

      if (!courseData.some((c) => c._id === courseId)) {
        updateCourse.push(updateData);
      }
      dispatch(setCourseData(updateCourse));
    } else {
      const filterCourse = courseData.filter((c) => c._id !== courseId);
      dispatch(setCourseData(filterCourse));
    }
  } catch (err) {
    console.error(err);
  }
};

  

  useEffect(() => {
    getCourseById();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleEidtCourse();
  };

  const handleEidtCourse = async () => {
    try {
      setSaving(true);
      const form = new FormData();
      form.append('title', title);
      form.append('subTitle', subTitle);
      form.append('description', description);
      form.append('category', category);
      form.append('level', level);
      form.append('price', String(price || ''));
      form.append('isPublished', String(Boolean(isPublished)));
      if (thumbnailFile) {
        form.append('thumbnail', thumbnailFile);
      }

      const { data } = await axios.post(`/api/course/editcourse/${courseId}`, form, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Course updated');
      navigate("/courses")
      // Update preview if backend returned new thumbnail
      if (data?.thumbnail) setPreviewImage(data.thumbnail);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const removeCourse = async () => {
    setLoading1(true)

    try {
      const result = await axios.delete(`${serverUrl}/api/course/remove/${courseId}`, { withCredentials: true })
      console.log(result.data);
      const filterCourse=courseData.filter(c=>c._id!==courseId)
      dispatch(setCourseData(filterCourse))
      setLoading1(false)
      toast.success("Course Removed")
      navigate("/courses")
      

    } catch (error) {
      console.log(error);
      setLoading1(false)
      toast.error(error.response.data.message)
      
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* Topbar */}
      <div className="flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative">
        <FaArrowLeft
          className="absolute top-2 left-6 w-6 h-6 cursor-pointer text-gray-600 hover:text-indigo-600 transition-all duration-300"
          onClick={() => navigate("/courses")}
        />
        <h2 className="text-2xl font-semibold md:pl-[60px] text-center md:text-left">
          Add detailed information regarding the course
        </h2>
        <div className="space-x-2 space-y-2">
          <button
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-200"
            onClick={() => navigate(`/createlecture/${courseId}`)}
          >
            Go to Lectures Page
          </button>
        </div>
      </div>

      {/* Form Details */}
      <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
        <h2 className="text-lg font-medium mb-4 text-gray-800">
          Basic Course Information
        </h2>

        {/* Publish / Unpublish + Remove */}
        <div className="space-x-2 space-y-2 mb-6">
          {!isPublished ? (
            <button
              type="button"
              onClick={() => setIsPublished(true)}
              className="bg-green-100 text-green-600 px-4 py-2 rounded-md border hover:bg-green-200 transition-all"
            >
              Click to Publish
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsPublished(false)}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-md border hover:bg-red-200 transition-all"
            >
              Click to Unpublish
            </button>
          )}
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded-md border hover:bg-red-700 transition-all"
            onClick={removeCourse}
            disabled={loading1}
          >
            {loading1 ? 'Removing...' : 'Remove Course'}
          </button>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700 mb-1 text-sm">
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Course Title"
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block font-medium text-gray-700 mb-1 text-sm">
              Subtitle
            </label>
            <input
              id="subtitle"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Course Subtitle"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium text-gray-700 mb-1 text-sm">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-4 py-2 rounded-md h-24 resize-none focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Course Description"
            />
          </div>

          {/* Category - Level - Price */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border px-4 py-2 rounded-md bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
              >
                <option value="">Select category</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="AI/ML">AI/ML</option>
                
                <option value="Data Analytics">Data Analytics</option>
                <option value="AI Tools">AI Tools</option>
                {/* <option value="App Development">App Development</option> */}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border px-4 py-2 rounded-md bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
              >
                <option value="">Course Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Course Price (INR)
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter course price"
              />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="text-sm block font-medium text-gray-700 mb-1">
              Course Thumbnail
            </label>
            <input
              type="file"
              hidden
              ref={thumb}
              accept="image/*"
              onChange={handleThumbnailChange}
            />
            <button
              type="button"
              onClick={() => thumb.current.click()}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-all"
            >
              Upload Thumbnail
            </button>
          </div>

          {/* Preview Thumbnail */}
     {/* {previewImage && console.log("PreviewImage value:", previewImage.slice(0, 50))} */}
{previewImage && (
  <img
    key={previewImage}
    src={previewImage}
    alt="Preview"
    className="w-48 h-48 object-cover border"
    onError={(e) =>
      console.error("Image failed to load:", e.target.src.substring(0, 30))
    }
  />
)}







          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-200"
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-5 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 ${saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'}`}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
