
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Plus } from "lucide-react"; // Added Plus, though not used directly in this modal

const vesselTypeOptions = [
  { value: 0, label: "Not Specified (0)" },
  { value: 70, label: "Cargo (70)" },
  { value: 80, label: "Tanker (80)" },
  { value: 60, label: "Passenger (60)" },
  { value: 30, label: "Fishing (30)" },
  { value: 40, label: "High Speed Craft (40)" },
  { value: 50, label: "Pilot Vessel (50)" },
];

const addVesselFormSchema = z.object({
  imoNumber: z.string().min(1, "IMO Number is required").regex(/^(IMO\s?)?\d{7}$/, "Invalid IMO format (e.g., 1234567 or IMO 1234567)"),
  mmsi: z.string().length(9, "MMSI must be exactly 9 digits").regex(/^\d{9}$/, "MMSI must be 9 digits"),
  vesselName: z.string().min(1, "Vessel Name is required"),
  callSign: z.string().min(1, "Call Sign is required"),
  vesselType: z.coerce.number({invalid_type_error: "Vessel type is required"}).refine(val => vesselTypeOptions.some(option => option.value === val), "Please select a valid vessel type"),
});

export type AddVesselFormValues = z.infer<typeof addVesselFormSchema>;

interface AddVesselModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddVesselFormValues) => void;
}

export default function AddVesselModal({ isOpen, onClose, onSave }: AddVesselModalProps) {
  const form = useForm<AddVesselFormValues>({
    resolver: zodResolver(addVesselFormSchema),
    defaultValues: {
      imoNumber: "",
      mmsi: "",
      vesselName: "",
      callSign: "",
      vesselType: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = (data: AddVesselFormValues) => {
    onSave(data);
    form.reset();
  };

  React.useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] grid-rows-[auto_1fr_auto]" onPointerDownOutside={(e) => e.preventDefault()} >
        <DialogHeader>
          <DialogTitle>Add New Vessel</DialogTitle>
          <DialogDescription>
            Create a new vessel here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4 overflow-y-auto px-1 max-h-[60vh]">
            <FormField
              control={form.control}
              name="imoNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IMO Number <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., IMO1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mmsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MMSI <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="9 digits, e.g., 123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="vesselName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vessel Name <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter vessel name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="callSign"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Call Sign <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter call sign" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vesselType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vessel Type <span className="text-destructive">*</span></FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value !== undefined ? String(field.value) : ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vessel type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vesselTypeOptions.map(option => (
                        <SelectItem key={option.value} value={String(option.value)}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save Vessel"}
            {!form.formState.isSubmitting && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
