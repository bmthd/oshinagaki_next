import { BiChevronUp } from "react-icons/bi";

export const PageTopButton = () => {
  return (
    <a href="#" title="ページトップに戻る">
      <div className="fixed right-4 bottom-4 w-16 h-16 bg-blue-500 opacity-80 rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-colors duration-75">
        <BiChevronUp size={72}/>
      </div>
    </a>
  );
};
