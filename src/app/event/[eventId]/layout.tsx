import { GoogleAnalytics } from "@/components/layouts";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GoogleAnalytics />
      {children}
    </>
  );
};

export default Layout;
