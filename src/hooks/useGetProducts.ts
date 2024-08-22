import { useState } from 'react';
import axios from 'axios';
import { Product } from '../interface/types';

//fetches products and returns them 
export const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Product[]>('http://127.0.0.1:5000/products');
      setProducts(response.data);
    } catch (error: any) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  return { fetchProducts, products, loading, error };
}
