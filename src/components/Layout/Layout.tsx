import React from "react";

import { LayoutRouteProps } from "react-router-dom";
import Header from "./Header";

const Layout: React.FC<LayoutRouteProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Use flex column layout */}
      <Header />
      <main className="flex-grow overflow-y-auto mt-28 mb-11 container mx-auto"> {/* No margin needed here */}
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
