import React, { useContext, useState } from "react";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import Endpoints from "../../api/Endpoints";
import { UserContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";

export default function Signup() {
    const {Errors} = useContext(UserContext);
    function LoginForm(){

    const navigate = useNavigate();
    const inputFields = [
      { type:"text", name :"name", label: "Your Name" },
      { type:"text", name :"username", label: "Username" },
      { type:"text", name :"email", label: "Email" },
      { type:"password", name :"password", label: "Password" },
      { type:"password", name :"confirmPassword", label: "Password confirmation" },
    ];
      
    const [data, setData] = useState({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    
    const handleinput = (e) => {
      setData({ ...data, [e.target.name]: e.target.value});
    }

    const [loading, setLoading] = useState(false);
    function handleSubmit(e) {
      e.preventDefault();
      if (
        data.name === "" ||
        data.username === "" ||
        data.email === "" ||
        data.password === "" ||
        data.confirmPassword === ""
      ) {
        toast.error("Please fill all the fields");
        return false
      }
      if (data.password!== data.confirmPassword) {
        toast.error("Password and confirm password are not same");
        return false
      }
      setLoading(true);
      const m = new Endpoints();
      const resp = m.sign_up(data);
      resp.then((res) => {
        setLoading(false);
        if(res.data.status){
          toast.success(res.data.message);
          setData({
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setTimeout(()=>{
            navigate('/login');
          },2000);
        } else { 
          toast.error(res.data.message);
        }
      }).catch((err) => {
        console.log("errors",err);
        setLoading(false);
        Errors(err);
      });
    }

    return (
      <>
        {inputFields.map((field, index) => (
          <input required key={index} name={field.name} onChange={handleinput} type={field.password} placeholder={field.label} className="input" />
        ))}
        <div className="m-auto table mt-8">
          <Button loading={loading} onclick={handleSubmit} type={"button"} text='Sign Up Now' classes={`m-auto `}  />
        </div>
      </>
    );
    }

    return (
      <Layout>
        <div className="h-[100vh] flex justify-center items-center" >
          <div className="w-full max-w-[500px] flex flex-col px-5 text-base leading-4 max-w-[590px] text-slate-500">
          <header>
              <Link to="/" className="self-center table  m-auto text-3xl font-mono font-bold text-center text-red-500 lowercase">Tennis</Link>
              <h2 className="text-center font-mono text-[20px] mt-6 font-bold text-white">Signup into runstream</h2>
          </header>
          <main className="mt-8" >
              <LoginForm />
          </main>
          <footer>
              <Link to="/login" className="text-center mt-4 text-sm table m-auto font-bold text-white">
                Already have an account?
              </Link>
          </footer>
          </div>
        </div>
      </Layout>
    );
}
