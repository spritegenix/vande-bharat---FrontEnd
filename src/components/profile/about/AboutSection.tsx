"use client";

import { useSearchParams } from "next/navigation";
import ToggleForm from "./ToggleForm";
import CustomForms from "./forms/CustomForms";
import useFormStore from "@/stores/formStore";
import CustomSection from "./customSection/CustomSection";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function AboutSection() {
  const searchParams = useSearchParams();
  const { formFields, removeField } = useFormStore();
  const tab = searchParams.get("sk") || "about_overview";
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const startEditing = (index: number) => {
    setEditingIndex(index);
    setFormOpen(true);
  };
  const handleDelete = (index: number) => {
    removeField(index);
  };

  switch (tab) {
    case "about_work":
      return <ToggleForm />;
    case "about_overview":
    default:
      return (
        <>
          <CustomSection />
          <div className="mt-3">
            {formFields.map((item, index) => (
              <div key={index} className="mb-3 space-y-2">
                <div className="flex justify-between leading-tight">
                  <div>
                    <h4>{item.value}</h4>
                    <p className="text-sm text-gray-500">{item.label}</p>
                  </div>
                  <div className="flex gap-3">
                    <div
                      className="cursor-pointer text-gray-500"
                      onClick={() => startEditing(index)}
                    >
                      <Edit size={17} />
                    </div>
                    <div
                      className="cursor-pointer text-gray-500"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 size={17} />
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {formOpen && editingIndex === index && (
                    <motion.div
                      key={`form-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="mt-2"
                    >
                      <CustomForms
                        isEditing
                        editIndex={index}
                        setFormOpen={setFormOpen}
                        initialValues={item}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </>
      );
  }
}
