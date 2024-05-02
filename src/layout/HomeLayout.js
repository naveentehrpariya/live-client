import Footer from "../pages/common/Footer";
import Header from "../pages/common/Header";

const HomeLayout = ({ children }) => {
  return <>
    <Header />
        {children}
    <Footer />
  </>
};

export default HomeLayout;