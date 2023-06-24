import Link from "next/link";
import { BiChevronUp } from "react-icons/bi";
import { FaChevronUp } from "react-icons/fa";

export const PageTopButton = () => {
  return (
    <a href="#" title="ページトップに戻る">
      <div className="fixed right-4 bottom-4 w-16 h-16 bg-blue-500 opacity-80 rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-colors duration-75">
        <BiChevronUp size={72}/>
      </div>
    </a>
  );
};

// #page-top {
//     display: block;
//     font-weight: bold;
//     padding: 0.7em;
//     text-align: center;
//     background: #fff; /*背景色*/
//     color: #666; /*文字色*/
//     transition: 0.3s;
//     width: 64px;
//     height: 64px;
//     position: fixed;
//     right: 10px;
//     bottom: 10px;
//     background: #0097fc;
//     opacity: 0.6;
//     border-radius: 50%;
//   }
//   /***マウスオーバー時***/
//   #page-top:hover {
//     background: #666; /*背景色*/
//     color: #fff; /*文字色*/
//   }
//   /* Font Awesome */
//   #page-top::before {
//     font-family: "Font Awesome 5 Free";
//     font-weight: 900;
//     content: "\f106";
//     font-size: 50px;
//     color: #ffffff;
//     position: absolute;
//     width: 36px;
//     height: 22px;
//     top: -5px;
//     bottom: 0;
//     right: 0;
//     left: 0;
//     margin: auto;
//     text-align: center;
//   }
