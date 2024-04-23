import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useFetch(){

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData  = (url) => { 
      axios.get(url).then((res)=>{
        console.log("data11",res)
        setIsLoading(false);
        setData(data);
        setError(null);
      }).catch(err => {
        setIsLoading(false);
        setError(err.message);
      });
  }

  return { data, isLoading, error, setData, setIsLoading, fetchData };
}

