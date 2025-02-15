import Link from "next/link";
import {
  BellRing,
  Bookmark,
  Home,
  MessageSquareShare,
  Squircle,
  StickyNote,
  UserRound,
  UserRoundCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  const [activeTab, setActiveTab] = useState("Home");

  const [showAllPages, setShowAllPages] = useState(false);
  const [showAllCommunities, setShowAllCommunities] = useState(false);

  return (
    <div className={` ${className}`}>
      <div className="space-y-2">
        <MenuTab icon={<Home />} label="Home" activeTab={activeTab} href="/" />
        <MenuTab icon={<MessageSquareShare />} label="Popular" activeTab={activeTab} href="/" />
        <MenuTab
          icon={<BellRing />}
          label="Notifications"
          activeTab={activeTab}
          href="/notifications"
        />
        <hr className="my-4 w-full max-w-52 border-t" />
        <MenuTab icon={<UserRound />} label="Profile" activeTab={activeTab} href="/follows" />
        <MenuTab icon={<UserRoundCheck />} label="Follows" activeTab={activeTab} href="/follows" />
        <MenuTab icon={<Bookmark />} label="Bookmarks" activeTab={activeTab} href="/bookmarks" />
      </div>
      <hr className="my-4 w-full max-w-52 border-t" />
      <p className="mb-2 pl-5 text-sm font-semibold text-zinc-500">Pages</p>
      <MenuTab
        icon={<StickyNote />}
        label="Followed Pages"
        activeTab={activeTab}
        href="/followed-pages"
      />
      <div className="space-y-2 pl-2">
        {Array.from({ length: showAllPages ? 10 : 5 }).map((_, index) => (
          <MenuTab
            key={index}
            icon={<Squircle />}
            label={`Pages ${index}`}
            activeTab={activeTab}
            href="#"
          />
        ))}
        <button
          onClick={() => setShowAllPages(!showAllPages)}
          className="ml-5 cursor-pointer text-sm font-semibold text-zinc-500"
        >
          {showAllPages ? "See Less" : "See All"}
        </button>
      </div>
      <hr className="my-4 w-full max-w-52 border-t" />
      <p className="mb-2 pl-5 text-sm font-semibold text-zinc-500">Communities</p>
      <MenuTab
        icon={<StickyNote />}
        label="Followed Pages"
        activeTab={activeTab}
        href="/followed-pages"
      />
      <div className="mb-10 space-y-2 pl-2">
        {Array.from({ length: showAllCommunities ? 10 : 5 }).map((_, index) => (
          <MenuTab
            key={index}
            icon={<Squircle />}
            label={`Community ${index}`}
            activeTab={activeTab}
            href="#"
          />
        ))}
        <button
          onClick={() => setShowAllCommunities(!showAllCommunities)}
          className="ml-5 cursor-pointer text-sm font-semibold text-zinc-500"
        >
          {showAllCommunities ? "See Less" : "See All"}
        </button>
      </div>
    </div>
  );
}

function MenuTab({ icon, label, activeTab, setActiveTab, className, href }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const truncatedLabel = label.length > 13 ? `${label.slice(0, 12)}...` : label;
  const isTruncatedLabel = label.length > 13 ? true : false;
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        onClick={() => setActiveTab(label)}
        className={`${
          activeTab === label ? "dark:text-background" : ""
        } relative flex w-52 cursor-pointer flex-nowrap items-center gap-2 rounded-full px-5 py-1.5 font-medium transition-all focus-visible:outline-2 ${className}`}
      >
        {activeTab === label && (
          <motion.span
            layoutId="bubble"
            className="absolute inset-0 z-10 gap-x-2 rounded-lg bg-zinc-200"
            transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
          />
        )}
        <span className="z-20 text-2xl transition-none">{icon}</span>
        <span className={`z-20 max-w-44 text-wrap capitalize`}>
          {isHovered && isTruncatedLabel ? label : truncatedLabel}
        </span>
      </Link>
    </div>
  );
}
