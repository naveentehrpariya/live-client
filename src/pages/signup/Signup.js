import React from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";

export default function Signup() {
   
   function LoginForm(){
     const inputFields = [
        { label: "Your Name" },
        { label: "Email" },
        { label: "Password" },
        { label: "Password confirmation" },
      ];
     
      function InputField({ label }) {
         return <input type="text" placeholder={label} className="input" />
      }

    return (
      <form>
        {inputFields.map((field, index) => (
          <InputField key={index} label={field.label} />
        ))}
        <div className="m-auto table mt-8">
         <Button text='Sign Up Now' classes={`m-auto `}  />
        </div>
      </form>
    );
  }

  return (
    <>
    <Layout>
      <div className="h-[100vh] flex justify-center items-center" >
         <div className="w-full max-w-[500px] flex flex-col px-5 text-base leading-4 max-w-[590px] text-slate-500">
         <header>
            <Link to="/" className="self-center table  m-auto text-3xl font-mono font-bold text-center text-red-500 lowercase">Runstream</Link>
            <h2 className="text-center font-mono text-[20px] mt-6 font-bold text-white">Login into runstream</h2>
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
    </>
  );
}
