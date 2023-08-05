export const PaddingedText = ({ texts }: { texts: (string | JSX.Element)[] }) => {
  return (
    <>
      {texts.map((text, index) => (
        <p key={index} className="p-2 text-lg">
          {text}
        </p>
      ))}
    </>
  );
};
