// controllers/searchController.js
import { GoogleGenAI } from "@google/genai";
import Course from "../model/courseModel.js";
import dotenv from 'dotenv'
dotenv.config()
export const SearchWithAi = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || input.trim() === "") {
      return res.status(400).json({ success: false, message: "Search query is required" });
    }

    // Perform search on multiple fields
 const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
 })

 const prompt=`you are an intelligent assistant for an LMS platform. A user  will type any query about what they want to learn. your task is to understand the intent and return one **most relevant keyword** from the following list of course  categories and levels:
 

### Available Course Categories:
- Web Development
- App Development
- Artificial Intelligence / Machine Learning (AI/ML)
- Data Science
- Cloud Computing
- Cybersecurity
-Ethical Hacking
- Blockchain
- Programming Languages
- Design & UI/UX
- Business & Marketing
- Personal Development
- Other (General Learning)

### Available Levels:
- Beginner
- Intermediate
- Advanced
- Not Specified



Query:${input}
 
 
 `

 const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:prompt,
  });


  const keyword=response.text
    const courses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: input, $options: "i" } },
        { subTitle: { $regex: input, $options: "i" } },
        { description: { $regex: input, $options: "i" } },
        { category: { $regex: input, $options: "i" } },
        { level: { $regex: input, $options: "i" } },
      ],
    }).select("title subTitle description category level thumbnail");
    if(courses.length>0){
        return res.status(200).json({
            success: true,
            courses,
          });

    }
    else{
        const courses = await Course.find({
            isPublished: true,
            $or: [
              { title: { $regex: keyword, $options: "i" } },
              { subTitle: { $regex: keyword, $options: "i" } },
              { description: { $regex: keyword, $options: "i" } },
              { category: { $regex: keyword, $options: "i" } },
              { level: { $regex: keyword, $options: "i" } },
            ],
          })
          return res.status(200).json({
            success: true,
            courses,
          });
    }

    
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      message: `Failed to search: ${error.message}`,
    });
  }
};
