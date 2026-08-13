import api from "./api";




async function CreataeCourse(data) 
{ 
     const res= await api.post("courses",data)
      return res.data
    
}

async function getAllCategory() {
       const res= await api.get("categories")
      return res.data
}

export{
CreataeCourse ,getAllCategory
}