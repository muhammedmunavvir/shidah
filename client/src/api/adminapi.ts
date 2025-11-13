import api from "@/services/api";

export const ProductImageUploadApi = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post("/admin/product-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; 
};

export const CreateProductApi = async (productData: any) => {
  const response = await api.post("/admin/product-createProduct", productData);
  return response.data;
};
export const GetAllUsers = async () => {
  const response = await api.get("/admin/usersList");
  return response.data;
};
export const GetAllOrders = async () => {
  const response = await api.get("/admin/allOrders");
  return response.data;
};
