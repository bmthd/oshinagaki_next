import { TwitterWidgets } from "./_components";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TwitterWidgets />
      {children}
    </>
  );
};

export default layout;
