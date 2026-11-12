type ProductModel = {
  name: string;
  power: number;
};
export type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  techSheetUrl: string;
  badge?: {
    label: string;
    variant: "gold" | "navy" | "light";
  };
  calculator?: string;
  models: ProductModel[];
};
