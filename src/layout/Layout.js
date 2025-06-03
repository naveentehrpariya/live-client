import Footer from "../pages/common/Footer";
import Header from "../pages/common/Header";

const Layout = ({ children, takeaction, redirect  }) => {
  return <>
      <div className="d-none" >
        <Header takeaction={takeaction} redirect={redirect} />
        <Footer /> 
      </div>
      {children}
  </>
};

export default Layout;