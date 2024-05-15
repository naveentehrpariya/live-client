import * as React from "react";
import grid from '../../img/grid.png'
import Button from "../common/Button";

export default function LetsTake() {
  return (
   <>
   <style>{`
   .takesection { border:1px solid #352525; }
   `}</style>
    <section className="py-6 md:py-20">
      <div className="container">
        <div className=" overflow-hidden relative takesection max-w-[996px] m-auto flex flex-col items-center py-16 md:py-28 px-6 md:px-20 text-lg leading-4 text-center text-white rounded-3xl  bg-slate-950 max-w-[996px]">
              <div className="md:max-w-[700px] w-full relative z-[3]">
                <h2 className='heading-md md:heading-lg text-center px-5 ' >Let's take your <span className="text-main" > streaming </span>
                game to the next level </h2>
                <p className="mt-5 leading-[100%] text-[18px] max-md:max-w-full">
                Let's start your streaming journey, start your free trial today, No
                credit card required 
                </p>
                <Button text="Sign up for free" classes={'mt-6'} ></Button>
              </div>
              <img loading="lazy" src={grid} alt="image"
              className="self-stretch z-1 absolute top-0 left-0 mt-0 w-full h-full w-full aspect-[5] backdrop-blur-[7.5px] max-md:max-w-full" />
        </div>
      </div>
    </section>
   </>
  );
}
 