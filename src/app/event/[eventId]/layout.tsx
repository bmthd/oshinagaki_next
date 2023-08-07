import { GoogleAnalytics } from "@/components/layouts/GoogleAnalytics";
import { TwitterWidgets } from "./_components";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TwitterWidgets />
      <GoogleAnalytics />
      {children}
    </>
  );
};

export default layout;
