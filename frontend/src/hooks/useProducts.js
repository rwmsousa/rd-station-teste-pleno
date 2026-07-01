import { useEffect, useState } from 'react';
import getProducts from '../services/product.service';

const useProducts = () => {
  const [preferences, setPreferences] = useState([]);
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        const allPreferences = [];
        const allFeatures = [];

        setProducts(products);

        products.forEach((product) => {
          const productPreferences = product.preferences
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
          allPreferences.push(...productPreferences);

          const productFeatures = product.features
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
          allFeatures.push(...productFeatures);
        });

        setPreferences(allPreferences);
        setFeatures(allFeatures);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao obter os produtos:', error);
        setError('Não foi possível carregar os produtos. Tente novamente mais tarde.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { preferences, features, products, isLoading, error };
};

export default useProducts;
