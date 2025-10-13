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
  Users,
  Plus,
  UserPlus,
  GitPullRequest,
  UserRoundPlus,
  Inbox,
  Store,
} from "lucide-react";
import Modal from "../elements/Modal";
import CreatePageForm from "./CreatePageForm";
import CreateCommunityForm from "./CreateCommunityForm";
import MotionAccordion from "../elements/Accordions/MotionAccordion";
// import { mockProfiles } from "../profile/FollowingProfile";
import UserAvatar from "./header/UserAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/stores/userStore";
import { useFollowingUsers } from "@/queries/user/user.queries";

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
  const { data } = useFollowingUsers();
  const user = useUserStore((state) => state.user);
  const userProfileSlug = user?.slug || user?._id;
  const [isCreatePageOpen, setIsCreatePageOpen] = useState(false);
  const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState(false);
  const profiles = data?.pages.flatMap((page) => page.data) || [];
  return (
    <>
      <div className={`pb-10 ${className}`}>
        <div className="space-y-2">
          <MenuTab icon={<Home />} label="Home" href="/" />
          <MenuTab icon={<MessageSquareShare />} label="Popular" href="/popular" />
          <MenuTab icon={<BellRing />} label="Notifications" href="/notifications" />
          <hr className="my-4 w-full max-w-52 border-t" />
          {userProfileSlug && (
            <MenuTab
              icon={<UserRound />}
              label="Profile"
              href={userProfileSlug && `/profile/${userProfileSlug}`}
            />
          )}
          <MenuTab icon={<Bookmark />} label="Bookmarks" href="/bookmarks" />
          <MenuTab icon={<Inbox />} label="Requests" href="/profile/requests" />
          <MenuTab icon={<UserRoundPlus />} label="Add Saathis" href="/profile" />
          <MenuTab icon={<Users />} label="Communities" href="/community" />
          <MenuTab icon={<Store />} label="Marketplace" href="/marketplace/products" />
        </div>
        <hr className="my-4 w-full max-w-52 border-t" />
        {/* ---------------------------Following---------------------------  */}
        {/* {profiles && profiles.length > 0 && (
          <>
            <p className="mb-2 pl-3 text-sm font-semibold text-zinc-500">Following</p>
            <div className="flex flex-col gap-y-3">
              {profiles?.slice(0, 6).map((profile) => (
                <Link
                  href={`/profile/${profile?.slug}`}
                  key={profile?._id}
                  className="flex items-center gap-x-5 pl-3"
                >
                  <Avatar>
                    <AvatarImage src={profile?.avatar} sizes="30" />
                    <AvatarFallback>
                      <Image
                        src="/images/profile/profileplaceholder.jpg"
                        alt="fallback"
                        height={30}
                        width={30}
                      />
                    </AvatarFallback>
                  </Avatar>

                  <p>{profile?.name}</p>
                </Link>
              ))}
              <Link
                href={`/profile/${userProfileSlug}?tab=following`}
                className="ml-4 cursor-pointer text-sm font-semibold text-zinc-500"
              >
                See All
              </Link>
            </div>
            <hr className="my-4 w-full max-w-52 border-t" />
          </>
        )} */}
        {/* --------------------------Communities----------------------------  */}
        <p className="mb-2 pl-5 text-sm font-semibold text-zinc-500">Communities</p>
        <Button variant={"outline"} asChild className="my-3 ml-4 border-gray-500">
          <Link href={`/community/create`} className="flex items-center gap-3">
            <Plus size={28} />
            <p className="">Create Community</p>
          </Link>
        </Button>

        {/* <MotionAccordion
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
        </div> */}
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
