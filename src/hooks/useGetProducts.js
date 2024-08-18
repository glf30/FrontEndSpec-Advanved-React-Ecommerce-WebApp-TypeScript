import { useState } from 'react';
import axios from 'axios';

export const useGetProducts = () => {
    // Fetch the products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await axios.get('http://127.0.0.1:5000/products');
            setProducts(response.data); 
        } catch (error) {
            setError("Error fetching products");
        } finally {
            setLoading(false);
        }
    };

    return { fetchProducts, products, loading, error };
};
