"use client";

import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";

type Tab = {
  value: string;
  label: string;
  content: string;
};

const tabData: Tab[] = [
  { value: "langchain", label: "Langchain", content: "Story about langchain here." },
  { value: "rust", label: "Rust", content: "Story about rust here." },
  { value: "python", label: "Python", content: "Story about python here." },
  { value: "java", label: "Java", content: "Story about java here." },
  { value: "go", label: "Go", content: "Story about go here." },
  { value: "javascript", label: "JavaScript", content: "Story about javascript here." },
  { value: "typescript", label: "TypeScript", content: "Story about typescript here." },
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
    <div className="flex justify-center h-screen">
      <Tabs defaultValue={tabData[0].value} className="w-full flex flex-col align-middle">
        <TabsList
          ref={tabsListRef}
          className={`flex space-x-2 overflow-x-auto max-w-full overflow-y-hidden ${
            isOverflowing ? "justify-start" : "justify-center"
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
