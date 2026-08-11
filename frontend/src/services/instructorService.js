import api from "./api";




async function CreataeCourse() 
{ 
     const res= await api.post("courses")
      return res.data
    
}