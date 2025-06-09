
   

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button"; // Import buttonVariants
import { cn } from "@/lib/utils"; // Import cn
import { AlertTriangle } from "lucide-react";

interface DeleteUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export default function DeleteUserDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: DeleteUserDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <AlertDialogTitle>Delete User</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-2">
            Are you sure you want to delete <strong>{userName}</strong>? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
              onClick={onClose}
              className="bg-black text-white hover:bg-black hover:text-white"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={buttonVariants({ variant: "destructive" })} // Use buttonVariants for consistency
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
