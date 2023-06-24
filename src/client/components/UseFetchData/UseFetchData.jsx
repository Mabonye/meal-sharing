import { useState, useEffect } from 'react';

const UseFetchData = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading };
};

export default UseFetchData;
