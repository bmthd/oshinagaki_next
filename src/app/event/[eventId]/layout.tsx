import { TwitterWidgets } from "./_components/TwitterWidgets";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TwitterWidgets />
      {children}
    </>
  );
};

export default layout;
