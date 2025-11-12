"use client";

import { useEffect, useState } from "react";
import ScrollToTopButton from "../elements/ScrollToTopButton";
import Header from "./header/Header";
import MenuBar from "./MenuBar";
import Wrapper from "../elements/Wrappers";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useCurrentUser } from "@/queries/user/user.queries";
import { useUserStore } from "@/stores/userStore";
import MenuBarMarketplace from "./MenuBarMarketplace";

export default function LayoutClient2({ children }: any) {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { data: user, isLoading, isError } = useCurrentUser({ fields: "banner,name,avatar,slug" });
  const { setUser } = useUserStore();
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);
  return (
    <>
      <Header
        setIsLeftMenuOpen={setIsLeftMenuOpen}
        isSearchOpen={isSearchOpen}
        setSearchOpen={setSearchOpen}
      />

      <Wrapper as="main" isTop className="mx-auto grid grid-cols-12">
        {/* Desktop View */}
        <nav className="col-span-2 hidden h-full border-r lg:block">
          <div className="fixed bottom-0 top-0 overflow-y-auto pt-10 lg:w-60">
            <MenuBarMarketplace className="pt-7" />
          </div>
        </nav>

        {/* Mobile View */}
        <AnimatePresence>
          {isLeftMenuOpen && (
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed left-0 flex ${isSearchOpen ? "sm:top-[5.5rem] md:top-[53px]" : "top-14"} z-50 w-full border-r bg-background shadow-lg lg:hidden`}
            >
              <MenuBarMarketplace className="h-[calc(100vh-3.5rem)] w-full overflow-y-auto p-4" />
              <div
                className="h-[calc(100vh-3.5rem)] w-2/5 bg-transparent"
                onClick={() => setIsLeftMenuOpen(false)}
              ></div>
            </motion.nav>
          )}
        </AnimatePresence>
        <section className="col-span-12 min-h-screen lg:col-span-10">{children}</section>
        {/* <aside className="col-span-2 hidden border-l sm:block"></aside> */}
      </Wrapper>
      <ScrollToTopButton />
    </>
  );
}
