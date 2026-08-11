import React from "react";
import "../components/css/CreateCourses.css"
import { useState } from "react";
const CreateCourse = () => {

  const [ formData, setFormData ] = useState({
    title: "",
    category: "",
    description:""
    ,image:"",
    level:"",
    instructor:"",
    isPublished:"",
    price:"",
    discount:"",
    accessCode:"",
    accessCodeActive:""
  })

  const navigate = useNavigate()

  function handleChange(event){
    setFormData({...formData, [event.target.name]:event.target.value})
  }

  async function handleSubmit(event){
    event.preventDefault()
    if(!formData.category){
      console.log("ERROR PLEASE FILL IN CATEGORY")
      return
    }
    const createdHoot = await createHoot(formData)
    navigate(`/hoots/${createdHoot._id}`)
  }



  return (
    <div>
      <h1></h1>

      <form action="/courses" method="POST" enctype="multipart/form-data">
        <div>
          <label for="title">Course Title:</label>
          <input type="text" id="title" name="title" required />
        </div>

        <div>
          <label for="category">Category:</label>
          <select id="category" name="category" required>
            <option value="">Select Category</option>

            <option value="6a7afff651a55fa8857c2758">Programming</option>
            <option value="6a7b001234567890abcdef12">Database</option>
            <option value="6a7b009876543210abcdef34">Web Development</option>
          </select>
        </div>

        <div>
          <label for="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
          ></textarea>
        </div>

        <div>
          <label for="image">Course Image:</label>
          <input type="file" id="image" name="image" accept="image/*" />
        </div>

        <div>
          <label for="level">Level:</label>
          <select id="level" name="level">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label for="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label for="discount">Discount:</label>
          <input
            type="number"
            id="discount"
            name="discount"
            min="0"
            max="100"
            value="0"
          />
        </div>

        <div>
          <label>
            <input type="checkbox" name="isPublished" value="true" />
            Publish Course
          </label>
        </div>

        <div>
          <label for="accessCode">Access Code:</label>
          <input type="text" id="accessCode" name="accessCode" />
        </div>

        <div>
          <label>
            <input type="checkbox" name="accessCodeActive" value="true" />
            Enable Access Code
          </label>
        </div>

        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
