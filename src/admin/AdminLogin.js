import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../context/AuthProvider";
import Endpoints from "../api/Endpoints";
import Button from "../pages/common/Button";
import Layout from "../layout/Layout";
import CheckLogin from "../pages/auth/CheckLogin";
import CheckAdmin from "./CheckAdmin";

export default function AdminLogin() {
  

    const {Errors, setIsAuthenticated, setUser} = useContext(UserContext);
    function LoginForm(){

    const inputFields = [
      { type:"text", name :"email", label: "Email" },
      { type:"password", name :"password", label: "Password" },
    ];
      
    const [data, setData] = useState({
      email: "",
      password: "",
      admin: true,
    });

    const handleinput = (e) => {
      setData({ ...data, [e.target.name]: e.target.value});
    }

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    function handleLogin(e) {
      e.preventDefault();
      if (data.email === "" || data.password === "") {
        toast.error("Email or password can't be empty.");
        return false
      }
      setLoading(true);
      const m = new Endpoints();
      const resp = m.login(data);
      resp.then((res) => {
        setLoading(false);
        if(res.data.status && res.data.user.role === '1'){
            navigate("/admin");
            toast.success(res.data.message);
            localStorage.setItem("admintoken", res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
        } else { 
          toast.error(res.data.message);
        }
      }).catch((err) => {
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
          <Button loading={loading} onclick={handleLogin} type={"button"} text='Login Now' classes={`m-auto `}  />
        </div>
      </>
    );
    }

    return (
      <Layout>
         <CheckAdmin />
        <div className="h-[100vh] flex justify-center items-center" >
          <div className="w-full max-w-[500px] flex flex-col px-5 text-base leading-4 max-w-[590px] text-slate-500">
          <header>
              <Link to="/" className="self-center table  m-auto text-3xl font-mono font-bold text-center text-red-500 drunk lowercase">runstream</Link>
              <h2 className="text-center font-mono text-[20px] mt-6 font-bold text-white">Admin</h2>
          </header>
          <main className="mt-8" >
              <LoginForm />
          </main> 
          </div>
        </div>
      </Layout>
    );
}
