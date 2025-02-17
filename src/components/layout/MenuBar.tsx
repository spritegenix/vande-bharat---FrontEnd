import { useState, ElementType } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  MessageSquareShare,
  BellRing,
  UserRound,
  UserRoundCheck,
  Bookmark,
  StickyNote,
  Squircle,
  BadgePlus,
} from "lucide-react";
import Modal from "../elements/Modal";
import CreatePageForm from "./CreatePageForm";
import CreateCommunityForm from "./CreateCommunityForm";

interface MenuBarProps {
  className?: string;
}

interface MenuTabProps {
  as?: ElementType;
  icon: React.ReactNode;
  label: string;
  className?: string;
  [key: string]: any;
}

export default function MenuBar({ className }: MenuBarProps) {
  const [showAllPages, setShowAllPages] = useState(false);
  const [showAllCommunities, setShowAllCommunities] = useState(false);
  const userProfileSlug = "user-1";

  const [isCreatePageOpen, setIsCreatePageOpen] = useState(false);
  const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState(false);

  return (
    <>
      <div className={`pb-10 ${className}`}>
        <div className="space-y-2">
          <MenuTab icon={<Home />} label="Home" href="/" />
          <MenuTab icon={<MessageSquareShare />} label="Popular" href="/popular" />
          <MenuTab icon={<BellRing />} label="Notifications" href="/notifications" />
          <hr className="my-4 w-full max-w-52 border-t" />
          <MenuTab
            icon={<UserRound />}
            label="Profile"
            href={userProfileSlug && `/profile/${userProfileSlug}`}
          />
          <MenuTab icon={<UserRoundCheck />} label="Follows" href="/follows" />
          <MenuTab icon={<Bookmark />} label="Bookmarks" href="/bookmarks" />
        </div>
        <hr className="my-4 w-full max-w-52 border-t" />
        {/* ---------------------------Pages---------------------------  */}
        <p className="mb-2 pl-5 text-sm font-semibold text-zinc-500">Pages</p>
        <MenuTab icon={<StickyNote />} label="Followed Pages" href="/followed-pages" />
        <div className="pl-2">
          {Array.from({ length: showAllPages ? 10 : 5 }).map((_, index) => (
            <MenuTab
              key={index}
              icon={<Squircle />}
              label={`Pages ${index}`}
              href={`/page/page-${index + 1}`}
            />
          ))}
          <button
            onClick={() => setShowAllPages(!showAllPages)}
            className="ml-5 cursor-pointer text-sm font-semibold text-zinc-500"
          >
            {showAllPages ? "See Less" : "See All"}
          </button>
        </div>
        <MenuTab
          as={"button"}
          icon={<BadgePlus />}
          label="Create Page"
          onClick={() => setIsCreatePageOpen(true)}
        />
        <hr className="my-4 w-full max-w-52 border-t" />
        {/* --------------------------Communities----------------------------  */}
        <p className="mb-2 pl-5 text-sm font-semibold text-zinc-500">Communities</p>
        <MenuTab icon={<StickyNote />} label="Followed Communities" href="/followed-communities" />
        <div className="pl-2">
          {Array.from({ length: showAllCommunities ? 10 : 5 }).map((_, index) => (
            <MenuTab
              key={index}
              icon={<Squircle />}
              label={`Community ${index}`}
              href={`/community/community-${index + 1}`}
            />
          ))}
          <button
            onClick={() => setShowAllCommunities(!showAllCommunities)}
            className="ml-5 cursor-pointer text-sm font-semibold text-zinc-500"
          >
            {showAllCommunities ? "See Less" : "See All"}
          </button>
        </div>
        <MenuTab
          as={"button"}
          icon={<BadgePlus />}
          label="Create Community"
          onClick={() => setIsCreateCommunityOpen(true)}
        />
      </div>
      {/* Create Page Modal  */}
      {isCreatePageOpen && (
        <Modal onClose={() => setIsCreatePageOpen(false)}>
          <CreatePageForm />
        </Modal>
      )}

      {/* Create Community Modal  */}
      {isCreateCommunityOpen && (
        <Modal onClose={() => setIsCreateCommunityOpen(false)}>
          <CreateCommunityForm />
        </Modal>
      )}
    </>
  );
}

function MenuTab({ as: Component = Link, icon, label, className, ...props }: MenuTabProps) {
  const pathname = usePathname();

  // Determine if the tab is active based on the current pathname
  const isActive = (): boolean => {
    return pathname === props.href;
  };

  return (
    <>
      <Component
        className={`${
          isActive() ? "dark:text-background" : ""
        } relative flex w-full cursor-pointer flex-nowrap items-center gap-2 py-1.5 pl-5 font-medium transition-all focus-visible:outline-2 ${className}`}
        {...props}
      >
        {isActive() && (
          <motion.span
            layoutId="bubble"
            className="absolute inset-0 z-10 gap-x-2 rounded-s-lg bg-zinc-200"
            transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
          />
        )}
        <span className="z-20 text-2xl transition-none">{icon}</span>
        <span className={`z-20 line-clamp-1 max-w-44 text-wrap capitalize hover:line-clamp-none`}>
          {label}
        </span>
      </Component>
    </>
  );
}
