"use client";

// import { logout } from "@/app/(auth)/actions";
// import { useSession } from "@/app/(main)/SessionProvider";
import { cn } from "@/lib/utils";
// import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  BadgeHelp,
  BadgePlus,
  Check,
  LogOutIcon,
  Monitor,
  Moon,
  Settings,
  Sun,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { FaAngleDown } from "react-icons/fa6";
import Button from "@/components/elements/Button";
import { PiUserSwitch } from "react-icons/pi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SignOutButton, useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useUserStore } from "@/stores/userStore";
interface UserButtonProps {
  className?: string;
}

export default function UserProfile({ className }: UserButtonProps) {
  const { user, setUser } = useUserStore();
  const { signOut } = useClerk();
  const { theme, setTheme } = useTheme();
  const [isProfileSwitchTab, setIsProfileSwitchTab] = useState(false);
  const handleLogout = async () => {
    await signOut();
    setUser("");
  };
  // const queryClient = useQueryClient();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative flex-none rounded-full focus:outline-none focus:ring-0",
            className,
          )}
        >
          <UserAvatar avatarUrl={user?.avatar} size={40} />
          <span className="absolute bottom-0 end-0 flex size-4 items-center justify-center rounded-full bg-primary p-0.5 text-white dark:bg-primary">
            <FaAngleDown />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <AnimatePresence mode="wait" initial={false}>
          {isProfileSwitchTab ? (
            <motion.div
              key="profile-switch"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <DropdownMenuLabel className="flex items-center gap-2">
                <button
                  onClick={() => setIsProfileSwitchTab(false)}
                  className="text-sm text-primary"
                >
                  <ArrowLeft className="size-6 rounded-full p-0.5 hover:bg-zinc-200" />
                </button>
                Switch Profile
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["Profile 1", "Profile 2", "Profile 3"].map((profile) => (
                <Link href={"/help"} key={profile}>
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 size-4" />
                    {profile}
                  </DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuItem>
                <Button
                  leftIcon={<BadgePlus className="text-xl" />}
                  onClick={() => setIsProfileSwitchTab(true)}
                >
                  Create new Profile
                </Button>
              </DropdownMenuItem>
            </motion.div>
          ) : (
            <motion.div
              key="default-menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <DropdownMenuLabel className="m-3">Logged in as @{user?.name}</DropdownMenuLabel>
              {/* <DropdownMenuLabel className="flex justify-center">
                <Button
                  leftIcon={<PiUserSwitch className="text-xl" />}
                  onClick={() => setIsProfileSwitchTab(true)}
                >
                  See all profiles
                </Button>
              </DropdownMenuLabel> */}
              <DropdownMenuSeparator />
              {/* <Link href={"/settings"}>
                <DropdownMenuItem>
                  <Settings className="mr-2 size-4" />
                  Settings
                </DropdownMenuItem>
              </Link> */}
              {/* <Link href={"/help"}>
                <DropdownMenuItem>
                  <BadgeHelp className="mr-2 size-4" />
                  Help & Support
                </DropdownMenuItem>
              </Link> */}
              {/* <Link href={"/feedback"}>
                <DropdownMenuItem>
                  <UserIcon className="mr-2 size-4" />
                  Feedback
                </DropdownMenuItem>
              </Link> */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Monitor className="mr-2 size-4" />
                  Theme
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <Monitor className="mr-2 size-4" />
                      System default
                      {theme === "system" && <Check className="ms-2 size-4" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 size-4" />
                      Light
                      {theme === "light" && <Check className="ms-2 size-4" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 size-4" />
                      Dark
                      {theme === "dark" && <Check className="ms-2 size-4" />}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                  SignOut
                  {/* <SignOutButton /> */}
                </Button>
                {/* <LogOutIcon className="mr-2 size-4" />
                Logout */}
              </DropdownMenuItem>
            </motion.div>
          )}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
