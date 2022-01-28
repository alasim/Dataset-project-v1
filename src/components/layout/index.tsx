import { DowloadModel } from "components/home/DownloadModel";
import { UpLoadModel } from "components/home/UploadModel";
import { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {/* <Header /> */}
      <UpLoadModel />
      <DowloadModel data={{
        id: "",
        title: "News today",
        user: "Hasan",
        downloads: 21,
        loves: 10,
        file: {
          id: "0",
          name: "",
          type: "",
          url: ""
        },
        date: Date(),
        tags: []
      }} />
      <main className="container">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
