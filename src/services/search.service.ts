import axios from "axios";

export interface SearchProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  ratingCount: number;
  brand: string;
  category: string;
}

export interface SearchResponse {
  products: SearchProduct[];
  totalItems: number;
  totalPages: number;
}

interface SearchApiProduct {
  id: number;
  title_fa: string;
  category_title: string;

  images: {
    main: string;
  };

  rating: {
    rate: number;
    count: number;
  };

  brand: {
    title_fa: string;
  };

  price: {
    selling_price: number;
  };
}

interface SearchApiResponse {
  result: {
    pager: {
      total_items: number;
      total_pages: number;
    };

    products: SearchApiProduct[];
  };
}

export async function SearchProducts(
  query: string,
  page = 1
): Promise<SearchResponse> {
  const { data } = await axios.get<SearchApiResponse>("/api/search", {
    params: {
      q: query,
      page,
    },
  });
  

  const result = data.result;
  
  const products = result.products.map((item) => ({
    id: item.id,
    title: item.title_fa,
    image: item.images.main,
    price: item.price.selling_price,
    rating: item.rating.rate,
    ratingCount: item.rating.count,
    brand: item.brand.title_fa,
    category: item.category_title,
  }));

  return {
    products,
    totalItems: result.pager.total_items,
    totalPages: result.pager.total_pages,
  };
}