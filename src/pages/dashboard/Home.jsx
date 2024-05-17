import AuthLayout from "../../layout/AuthLayout";
import CreateStream from "./stream/CreateStream";
import Endpoints from "../../api/Endpoints";
import { useEffect, useState } from "react";
import StreamLists from "./stream/StreamLists";
import Loading from "../common/Loading";
export default function Home() {

    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false);
    function listsstreams() {
      setLoading(true);
      const m = new Endpoints();
      const resp = m.lists_streams();
      resp.then((res) => {
        setLoading(false);
        setLists(res.data.streams);
      }).catch((err) => {
        setLoading(false);
      });
    }
  
    useEffect(()=>{
      listsstreams();
    },[]);

  return (
    <AuthLayout heading="My Streams" >
      {loading ? <Loading /> : ""}
      {lists && lists.length ? <StreamLists reload={listsstreams} lists={lists} /> : 
        <>
        {!loading ? <div className="flex h-[80vh] justify-center items-center" >
          <CreateStream />
        </div> : ""}
        </> 
      }
    </AuthLayout>
  );
}
