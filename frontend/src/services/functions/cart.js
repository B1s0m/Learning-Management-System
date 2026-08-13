import api from "../api"


async function addToCart(id) {
    const res = await api.post("/carts/add/"+id)
    console.log(res.data);
    return res.data
    
}

 async function getMyCart() {
     const res =  await api.get("/carts");
  return  res.data
}


 async function checkoutCart() {
      const res =  await api.post("/carts/checkout");
     return  res.data
}


 async function deleteCourseFromCart(courseId) {
     const res =  await api.delete("/carts/" + courseId);
     return res.data
}


 async function deleteAllCart(cartId) {
     const res = await api.delete("/carts/allCart/" + cartId);
     return res.data
}


export {
addToCart,getMyCart ,deleteAllCart,deleteCourseFromCart,checkoutCart


}