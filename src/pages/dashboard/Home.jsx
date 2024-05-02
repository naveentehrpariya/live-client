import * as React from "react";
import AuthLayout from "../../layout/AuthLayout";
import CreateStream from "./stream/CreateStream";

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
export default function Home() {
  return (
    <AuthLayout>
       <div className="flex h-[80vh] justify-center items-center" >
          <CreateStream />
       </div>
    </AuthLayout>
  );
}
