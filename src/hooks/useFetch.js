import { useState, useEffect } from 'react';
import Api from '../api/Api';
import { FaBullseye } from 'react-icons/fa';
export default function useFetch({url}){

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  async function fetch(signal) {
    if(url && !loading){
      setLoading(true);
      const resp = Api.get(url, {signal});
      resp.then((res)=>{
        setData(res.data.result || []);
        setLoading(false);
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(signal);
  }, []);

  return { loading, data };
}

