import api from "@/services/api"

export const myOrderapi=async(userId:string)=>{
  try {
     const Response=await api.get(`/order/my-order/${userId}`)
     return Response.data
  } catch (error) {
      console.error("Error fetching orders:", error);
    throw error; 
  }
}