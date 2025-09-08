export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  currency?: string;
  stock: number;
  category: string;
  discount: string;
  badge: string;
  sizes?: string[];
  colors?: string[];
  images: string[];
  isBestSeller?: boolean;
  isPremium?: boolean;
  tags?: string[];
  ratings?: {
    average: number;
    count: number;
  };
}
