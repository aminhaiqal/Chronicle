import React from "react"; 

const ThumbsUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ffffff"} fill={"none"} {...props}>
    <path d="M7 20.5L3 20.5C2.44771 20.5 2 20.0522 2 19.5V11.5C2 10.9477 2.44772 10.5 3 10.5H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.9477 20.5H7V10.5L13.9158 3.49997L13.9867 3.57177C15.432 5.03467 15.8379 7.24745 15.0078 9.13799L14.4098 10.5H20.0224C21.3836 10.5 22.3371 11.8603 21.8874 13.1607L19.8127 19.1607C19.5353 19.9628 18.7874 20.5 17.9477 20.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export default ThumbsUpIcon;