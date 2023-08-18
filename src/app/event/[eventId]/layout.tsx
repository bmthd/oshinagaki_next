import { GoogleAnalytics } from "@/components/layouts/GoogleAnalytics";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GoogleAnalytics />
      {children}
    </>
  );
};

export default Layout;
