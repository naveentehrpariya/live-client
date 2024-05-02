import * as React from "react";
import CheckLogin from "../pages/auth/CheckLogin";
import Sidebar from "../pages/dashboard/Sidebar";

function IconImage({ src, alt }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className="shrink-0 w-5 aspect-square"
    />
  );
}

export default function AuthLayout({children}) {
  return (
    <div className="auth-wrap flex justify-between  max-md:flex-wrap">
      <Sidebar />
      <main className="main-wrap flex flex-col self-start max-md:max-w-full">
        <header className="sticky top-0 bg-dark border-b border-gray-900 px-7 py-6 flex items-center w-full max-md:flex-wrap max-md:max-w-full">
          <h1 className="flex-auto text-xl font-bold leading-8 text-white"> My Streams </h1>
          <div className="flex gap-5">
            
            <div className="flex justify-center items-center px-3 bg-red-500 h-[43px] rounded-[50px] w-[43px]">
              <IconImage
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/097738c8857f52477590551c0de93a9f727b14487d36ac8a7e6e32617c86cca2?apiKey=2e16c10895744f95b3906b7e14da906a&"
                alt="Add icon" />
            </div>
            <div className="flex gap-2.5 px-5 py-3 text-base leading-6 whitespace-nowrap border border-solid border-neutral-400 rounded-[50px] text-neutral-400">
              <IconImage
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/35d255e98b0af40283fe6d704d2c65fccd0e06eb2c1c2d1896ddaa78ab00d871?apiKey=2e16c10895744f95b3906b7e14da906a&"
                alt="Logout icon" />
              <div className="my-auto">Logout</div>
            </div>
          </div>
        </header>
         <div className="content p-8" >
            {children}
         </div>
      </main>
      <CheckLogin />
    </div>
  );
}
