"use client";

import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";
import Article from "./article";

type Tab = {
  value: string;
  label: string;
  content: JSX.Element;
};

const tabData: Tab[] = [
  { value: "all", label: "All", content: <Article /> },
  { value: "langchain", label: "Langchain", content: <div>Story about langchain here.</div> },
  { value: "rust", label: "Rust", content: <div>Story about rust here.</div> },
  { value: "python", label: "Python", content: <div>Story about python here.</div> },
  { value: "java", label: "Java", content: <div>Story about java here.</div> },
  { value: "go", label: "Go", content: <div>Story about go here.</div> },
  { value: "javascript", label: "JavaScript", content: <div>Story about javascript here.</div> },
  { value: "typescript", label: "TypeScript", content: <div>Story about typescript here.</div> },
];

export default function Story() {
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (tabsListRef.current) {
        setIsOverflowing(tabsListRef.current.scrollWidth > tabsListRef.current.clientWidth);
      }
    };

    // Check overflow initially and on resize
    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div className="flex justify-center h-fit mb-44">
      <Tabs defaultValue={tabData[0].value} className="w-full flex flex-col align-middle">
        <div>
          <TabsList
            ref={tabsListRef}
            className={`flex space-x-2 max-w-full overflow-y-hidden ${isOverflowing ? "justify-start" : "justify-center"
              }`}
            style={{ scrollbarWidth: "none" }}
          >
            {tabData.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <Separator className="my-4 h-px bg-zinc-500" />
        </div>
        <div className="ml-4 mr-4">
          {tabData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
