import * as React from "react";
import CheckLogin from "../pages/auth/CheckLogin";
import Sidebar from "../pages/dashboard/Sidebar";
import Logo from "../pages/common/Logo";
import { UserContext } from "../context/AuthProvider";
import TimeCounter from "../pages/common/TimeCounter";
import {Helmet} from "react-helmet";

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

export default function AuthLayout({children, heading}) {

  const {user} = React.useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const [windowWidth, setWindowWidth] = React.useState(window && window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  const [toggle, setToggle] = React.useState(false);

  return (
    <>
      <Helmet>
         <meta charSet="utf-8" />
         <title>{heading ? `${heading} | ` : '' } RunStream </title>
         <link rel="canonical" href={window.location.href || "https://runstream.co"} />
      </Helmet>

      <div className="auth-wrap flex justify-between max-lg:flex-wrap">
        <Sidebar logout={logout} trial={<>
          {user && user.trialStatus === "active" ? 
            <div className="text-white justify-center mt-4 flex md:hidden items-center font-bold text-sm ">
              <p className="mb-0">Trial Ends In : <TimeCounter date={user.free_trial} /></p>
            </div>
          : ''}
        </>} toggle={toggle} />
        <main className="main-wrap flex flex-col self-start max-lg:max-w-full">
          <header className=" sticky top-6 lg:top-0  z-10 bg-dark border-b border-gray-900 px-6 md:px-7 py-4 xl:py-6 flex items-center w-full justify-between">
            {windowWidth < 1200 ? <Logo /> : <h1 className="flex-auto text-xl font-bold leading-8 text-white"> {heading ? heading : "Dashboard"}</h1>}
            <div className="flex gap-5 items-center">
              {user && user.trialStatus === "active" ? 
                <div className="text-white hidden md:flex items-center font-bold text-sm bg-main text-center px-6 py-[13px] rounded-[30px]">
                  <p className="mb-0">Trial Ends In : <TimeCounter date={user.free_trial} /></p>
                </div>
              : ''}
              <button onClick={logout} className="logoutbtn flex gap-2.5 px-5 py-3 text-base leading-6 whitespace-nowrap border border-solid border-neutral-400 rounded-[50px] text-neutral-400">
                <IconImage
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/35d255e98b0af40283fe6d704d2c65fccd0e06eb2c1c2d1896ddaa78ab00d871?apiKey=2e16c10895744f95b3906b7e14da906a&"
                  alt="Logout icon" />
                <div className="my-auto">Logout</div>
              </button>
              <button onClick={() => setToggle(!toggle)} className="sidebar-toggle text-base leading-6 whitespace-nowrap text-neutral-400">
                <span className="" ></span>
                <span className="my-2" ></span>
                <span className="" ></span>
              </button>
            </div>
          </header>
          <div className="content p-6 md:p-8" >
            {windowWidth < 1200 ? <h1 className="flex-auto pb-4 md:pb-8 text-2xl md:text-3xl font-bold leading-8 text-white"> {heading ? heading : "Dashboard"}</h1> : "" }
            {children}
          </div>
        </main>
        <CheckLogin takeaction={true} />
      </div>
    </>
  );
}
