import { useState, ElementType } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bookmark,
  Folder,
  GitPullRequest,
  Plus,
  Store,
  BadgePlus,
  LayoutGrid,
  ShoppingBag,
  Tag,
  ClipboardList,
  Heart,
  Inbox,
  Home,
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

export default function MenuBarMarketplace({ className }: MenuBarProps) {
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
          <MenuTab icon={<BadgePlus />} label="Add Product" href="/marketplace/add-listings" />
          <MenuTab icon={<LayoutGrid />} label="Categories" href="/marketplace/categories" />
          <MenuTab icon={<ShoppingBag />} label="Products" href="/marketplace/products" />
          {/* <MenuTab icon={<Tag />} label="Offers" href="/marketplace/offers" /> */}
        </div>
        <hr className="my-4 w-full max-w-52 border-t" />
        <p>My Activity</p>
        <MenuTab icon={<ClipboardList />} label="My Listings" href="/marketplace/my-listings" />
        <MenuTab icon={<Heart />} label="Wishlist" href="/marketplace/wishlist" />
        {/* <MenuTab icon={<Inbox />} label="Inbox" href="/marketplace/inbox" /> */}
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
