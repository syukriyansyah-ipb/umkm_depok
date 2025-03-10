export interface ProductType {
  _id: string
  name: string
  category: string
  price: number | string;
  imageUrl: string | null;
  type: string | null;
  description: string | null;
  isBestSeller: boolean;
  fileKey: string | null;
} 