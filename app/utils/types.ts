export type Product = {
    id: string;
    ean: string;
    name: string;
    description: string;
    category: object;
    brand: string;
    image: string;
    created_at: string;
    updated_at: string;
  };

 export type StorePrice = {
    "ean": string;
    "store" : string;
    "price" : string;
    "price_history": PricePoint[];
    "created_at": string;
    "updated_at": string;
    "ranking": string;
    "price_increase": string,
}

export type PricePoint = {"price": number, "date": string}