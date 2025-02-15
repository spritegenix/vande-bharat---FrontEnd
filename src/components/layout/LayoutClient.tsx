"use client";

import { useEffect, useState } from "react";
import ScrollToTopButton from "../elements/ScrollToTopButton";
import Header from "./header/Header";
import MenuBar from "./MenuBar";
import Wrapper from "../elements/Wrappers";
import { AnimatePresence, motion } from "framer-motion";

export default function LayoutClient({ children }: any) {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    import("@/app/(UserAuth)/_sections/AuthModal");
  }, []);

  return (
    <>
      <Header
        setIsLeftMenuOpen={setIsLeftMenuOpen}
        isSearchOpen={isSearchOpen}
        setSearchOpen={setSearchOpen}
      />
      <Wrapper as="main" isTop className="mx-auto grid grid-cols-12">
        {/* Desktop View */}
        <nav className="col-span-2 hidden h-[calc(100vh-3.5rem)] overflow-y-hidden border-r hover:overflow-y-auto lg:block">
          <MenuBar className="pt-4" />
        </nav>

        {/* Mobile View */}
        <AnimatePresence>
          {isLeftMenuOpen && (
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed left-0 ${isSearchOpen ? "top-[5.5rem]" : "top-14"} z-50 h-[calc(100vh-3.5rem)] w-56 overflow-y-auto border-r bg-background shadow-lg dark:bg-background lg:hidden`}
            >
              <MenuBar className="p-4" />
            </motion.nav>
          )}
        </AnimatePresence>
        <section className="col-span-8">{children}</section>
        <aside className="col-span-2 hidden border-l sm:block"></aside>
      </Wrapper>
      <ScrollToTopButton />
    </>
  );
}
