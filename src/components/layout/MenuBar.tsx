import { useState, ElementType } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  MessageSquareShare,
  BellRing,
  UserRound,
  Bookmark,
  Squircle,
  BadgePlus,
  Folder,
} from "lucide-react";
import Modal from "../elements/Modal";
import CreatePageForm from "./CreatePageForm";
import CreateCommunityForm from "./CreateCommunityForm";
import MotionAccordion from "../elements/Accordions/MotionAccordion";

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
          <MenuTab icon={<Bookmark />} label="Bookmarks" href="/bookmarks" />
        </div>
        <hr className="my-4 w-full max-w-52 border-t" />
        {/* ---------------------------Following---------------------------  */}
        <p className="mb-2 pl-3 text-sm font-semibold text-zinc-500">Following</p>
        <div>
          {Array.from({ length: 8 }).map((_, index) => (
            <MenuTab
              key={index}
              icon={<Squircle />}
              label={`Profile ${index}`}
              href={`/profile/page-${index + 1}`}
            />
          ))}
          <Link
            href={"/profile"}
            className="ml-4 cursor-pointer text-sm font-semibold text-zinc-500"
          >
            See All
          </Link>
        </div>
        <hr className="my-4 w-full max-w-52 border-t" />
        {/* --------------------------Communities----------------------------  */}
        <p className="mb-2 pl-5 text-sm font-semibold text-zinc-500">Communities</p>
        <MotionAccordion
          className="space-y-1"
          title="Your Communities"
          titleClassName="text-left px-4"
          titleIcon={<Folder />}
          defaultOpen
          openIcon={<span>➕</span>}
          closeIcon={<span>➖</span>}
        >
          <div className="ml-3">
            {Array.from({ length: showAllCommunities ? 10 : 5 }).map((_, index) => (
              <MenuTab
                key={index}
                icon={<Squircle />}
                label={`Owned Community ${index}`}
                href={`/community/owned-community-${index + 1}`}
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
        </MotionAccordion>
        <div>
          {Array.from({ length: 8 }).map((_, index) => (
            <MenuTab
              key={index}
              icon={<Squircle />}
              label={`Community ${index}`}
              href={`/community/community-${index + 1}`}
            />
          ))}
          <Link
            href={"/community"}
            className="ml-5 cursor-pointer text-sm font-semibold text-zinc-500"
          >
            See All
          </Link>
        </div>
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
        } relative flex w-full cursor-pointer flex-nowrap items-center gap-2 py-1.5 pl-4 transition-all focus-visible:outline-2 ${className}`}
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
