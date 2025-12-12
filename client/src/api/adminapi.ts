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
export const UpdateProductApi = async (productId: string, productData: any) => {
  const response = await api.put(`/admin/product-updateProduct/${productId}`, productData);
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
export const updateMaintenance = async (value: boolean) => {
  console.log(value, "apiiii");
  try {
    const response = await api.post("/admin/Maintenance", { enabled: value });
    return response.data; // This is already parsed JSON
  } catch (error) {
    console.error("Update maintenance error:", error);
    throw error;
  }
};

export const fetchmaintennancestatus = async () => {
  try {
    const response = await api.get("/admin/MaintenanceStatus");
    return response.data; // This is already parsed JSON
  } catch (error) {
    console.error("Fetch maintenance status error:", error);
    throw error;
  }
};
