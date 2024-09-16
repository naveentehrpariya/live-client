import React, { useContext, useState } from 'react'
import HomeLayout from '../layout/HomeLayout'
import toast from 'react-hot-toast';
import Api from '../api/Api';
import { UserContext } from '../context/AuthProvider';

export default function Contact(){

   const [loading, setLoading] = useState(false);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const {Errors} = useContext(UserContext);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const resp = Api.post(`/user/contact_us`,{name, email, message});
      resp.then((res)=>{
         if(res.data.status){
            toast.success(res.data.message);
            setName('');
            setEmail('');
            setMessage('');
         } else {
            toast.error('Message not sent');
         }
         setLoading(false);
      }).catch((err) => {
         console.log(err);
         Errors(err);
      });
   }


   return (
      <HomeLayout>
         <div id='contact' className="flex py-16 md:py-22 items-center justify-start bg-dark">
            <div className="mx-auto w-full p-6 max-w-lg">
               <h1 className="text-3xl text-center text-white font-medium">Contact us</h1>
               <p className="mt-2 text-lg text-center text-gray-300 max-w-[300px] m-auto table">Email us at <a className='text-main' href="mailto:support@runstream.co">support@runstream.co</a> or message us here:</p>
               <form a className="mt-6" onSubmit={handleSubmit} >
                  <div className="grid gap-2 md:gap-6 md:grid-cols-2">
                     <div className="relative z-0">
                        <input value={name} onChange={(e)=> setName(e.target.value)} type="text" name="name" className="input text-white" placeholder="Name" />
                     </div>
                     <div className="relative z-0">
                        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="text" name="email" className="input text-white" placeholder="Email" />
                     </div>
                  </div>
                  <div className="relative z-0  mt-3 col-span-2">
                     <textarea value={message} onChange={(e)=> setMessage(e.target.value)} name="message"  className="input text-white" placeholder="Message"></textarea>
                  </div>
                  <div className='flex justify-center' >
                     <button type="submit" className="btn md mt-4 ">{loading ? "Sending..." : "Send Message"}</button>
                  </div>
               </form>
            </div>
         </div>
      </HomeLayout>
   )
}
