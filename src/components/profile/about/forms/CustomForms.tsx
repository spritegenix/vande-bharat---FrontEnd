"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useFormStore from "@/stores/formStore";
import { useEffect } from "react";

// Schema
const fieldSchema = z.object({
  label: z.string().min(1, "Label is required"),
  type: z.enum(["text", "textarea", "date", "number"]),
  value: z.string().min(1, "value is required"),
});
interface CustomFormsProps {
  setFormOpen: (value: boolean) => void;
  initialValues?: NewField;
  editIndex?: number;
  isEditing?: boolean;
}
type NewField = z.infer<typeof fieldSchema>;

export default function CustomForms({
  setFormOpen,
  initialValues,
  editIndex,
  isEditing = false,
}: CustomFormsProps) {
  const { addField, formFields, updateField } = useFormStore();

  const form = useForm<NewField>({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      label: "",
      type: "text",
      value: "",
    },
  });
  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);
  const selectedType = form.watch("type");

  const onSubmit = (data: NewField) => {
    if (isEditing && typeof editIndex === "number") {
      updateField(editIndex, data); // Update
    } else {
      addField(data); // Add
    }
    form.reset();
    setFormOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Label Field */}
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="Field label" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type Field */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="textarea">Textarea</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Value Field */}
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                {selectedType === "textarea" ? (
                  <Textarea placeholder="Enter text..." {...field} />
                ) : (
                  <Input
                    type={
                      selectedType === "date"
                        ? "date"
                        : selectedType === "number"
                          ? "number"
                          : "text"
                    }
                    placeholder="Enter value"
                    {...field}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="flex justify-start gap-2 lg:justify-end">
          <Button type="button" onClick={() => setFormOpen(false)} className="bg-gray-300">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
