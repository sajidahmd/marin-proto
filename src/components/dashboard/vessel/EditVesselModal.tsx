
   

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
import { Save, Edit } from "lucide-react"; // Added Edit, though not used directly in this modal
import type { Vessel } from '@/app/dashboard/vessel/page'; // Assuming Vessel type is exported from page

const vesselTypeOptions = [
  { value: 0, label: "Not Specified (0)" },
  { value: 70, label: "Cargo (70)" },
  { value: 80, label: "Tanker (80)" },
  { value: 60, label: "Passenger (60)" },
  { value: 30, label: "Fishing (30)" },
  { value: 40, label: "High Speed Craft (40)" },
  { value: 50, label: "Pilot Vessel (50)" },
];

// Schema excludes IMO as it's not editable
const editVesselFormSchema = z.object({
  mmsi: z.string().length(9, "MMSI must be exactly 9 digits").regex(/^\d{9}$/, "MMSI must be 9 digits"),
  vesselName: z.string().min(1, "Vessel Name is required"),
  callSign: z.string().min(1, "Call Sign is required"),
  vesselType: z.coerce.number({invalid_type_error: "Vessel type is required"}).refine(val => vesselTypeOptions.some(option => option.value === val), "Please select a valid vessel type"),
});

export type EditVesselFormValues = z.infer<typeof editVesselFormSchema>;

interface EditVesselModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditVesselFormValues) => void;
  vesselToEdit: Vessel | null;
}

export default function EditVesselModal({ isOpen, onClose, onSave, vesselToEdit }: EditVesselModalProps) {
  const form = useForm<EditVesselFormValues>({
    resolver: zodResolver(editVesselFormSchema),
    defaultValues: { // Default values for when no vessel is being edited (or on reset)
      mmsi: "",
      vesselName: "",
      callSign: "",
      vesselType: undefined,
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    if (vesselToEdit && isOpen) {
      form.reset({
        mmsi: vesselToEdit.MMSI.toString(),
        vesselName: vesselToEdit.NAME,
        callSign: vesselToEdit.CALLSIGN || "",
        vesselType: vesselToEdit.TYPE,
      });
    } else if (!isOpen) {
      form.reset({ // Reset to default when modal closes or no vessel
        mmsi: "",
        vesselName: "",
        callSign: "",
        vesselType: undefined,
      });
    }
  }, [isOpen, vesselToEdit, form]);


  const onSubmit = (data: EditVesselFormValues) => {
    onSave(data);
    // Form reset will be handled by useEffect when isOpen changes or vesselToEdit becomes null
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] grid-rows-[auto_1fr_auto]" onPointerDownOutside={(e) => e.preventDefault()} >
        <DialogHeader>
          <DialogTitle>Edit Vessel: {vesselToEdit?.NAME || "Vessel"}</DialogTitle>
          <DialogDescription>
            Update vessel information here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4 overflow-y-auto px-1 max-h-[60vh]">
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
                    <Input placeholder="Enter call sign" {...field} value={field.value ?? ""} />
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
            {!form.formState.isSubmitting && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
