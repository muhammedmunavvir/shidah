export interface IProduct {
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  currency: string;
  stock: number;
  category: string;
  badge?:string;
  discount?:string;
//   subCategory?: string;
  sizes?: string[];
  colors?: string[];
  images: string[];
  isBestSeller: boolean;
  isPremium: boolean;
  tags?: string[];
  ratings?: {
    average: number;
    count: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
