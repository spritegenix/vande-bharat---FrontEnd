"use client";
import React, { useState } from "react";
import Workplace from "./forms/Workplace";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ToggleForm() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {!formOpen ? (
          <motion.div
            key="workplace-button"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="inline-flex cursor-pointer items-center gap-2 text-blue-600 hover:underline"
            onClick={() => setFormOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add a Workplace
          </motion.div>
        ) : (
          <motion.div
            key="workplace-form"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Workplace setFormOpen={setFormOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
