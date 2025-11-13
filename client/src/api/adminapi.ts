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
