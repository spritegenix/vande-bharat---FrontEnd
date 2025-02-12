import React from "react";
import { motion } from "framer-motion";

interface TabProps {
  tabs: {
    id: string | any;
    label: string;
    icon: JSX.Element;
  }[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const Tab: React.FC<TabProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <>
      {tabs.map((tab) => (
        <React.Fragment key={tab?.id}>
          <li
            onClick={() => setActiveTab(tab?.label)}
            className={`${
              activeTab === tab?.label
                ? "mb-0 text-white"
                : "text-black hover:text-bg1"
            } relative flex w-full cursor-pointer flex-nowrap items-center gap-2 rounded-full px-0.5 py-1.5 font-medium transition-all focus-visible:outline-2 max-lg:justify-center md:px-5`}
          >
            {activeTab === tab?.label && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 gap-x-2 rounded-full bg-bg1 shadow-lg"
                transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
              />
            )}
            <span className="z-20 text-2xl transition-none">{tab?.icon}</span>
            <span className="z-20 capitalize">{tab?.label}</span>
          </li>
        </React.Fragment>
      ))}
    </>
  );
};

export default Tab;
