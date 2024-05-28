import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../api/Api';
export default function useFetch(){

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  async function fetch(url) {
    if(url){
      setIsLoading(true);
      const resp = Api.get(url)
      resp.then((res)=>{
        setData(res.data.result)
      }).catch((err)=>{
        console.log(err);
        setIsLoading(false);
      });
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return { isLoading, data };
}

