import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {Link} from "react-router-dom";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {useToast} from "@/hooks/use-toast";
import {Send, KeyRound, ArrowLeft} from "lucide-react";

const requestResetSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const resetPasswordSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP/Reset Code must be at least 6 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmNewPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match.",
  path: ["confirmNewPassword"],
});

type RequestResetFormValues = z.infer<typeof requestResetSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ForgotPasswordForm() {
  const {toast} = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [emailForReset, setEmailForReset] = useState<string>("");

  const requestForm = useForm<RequestResetFormValues>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: {email: ""},
    mode: "onChange",
  });

  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {otp: "", newPassword: "", confirmNewPassword: ""},
    mode: "onChange",
  });

  async function onRequestReset(data: RequestResetFormValues) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Request reset data:", data);
    setEmailForReset(data.email);
    toast({
      title: "Reset Link Sent!",
      description: `A password reset link has been sent to ${data.email}. Please check your inbox.`,
    });
    setStep(2);
    requestForm.reset();
  }

  async function onResetPassword(data: ResetPasswordFormValues) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Reset password data:", data, "for email:", emailForReset);
    toast({
      title: "Password Reset Successfully!",
      description: "Your password has been updated. You can now sign in with your new password.",
    });
    resetForm.reset();
    setStep(1); // Optionally go back to step 1 or redirect
    // router.push('/sign-in');
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        {step === 1 && (
          <CardDescription>Enter your email address and we&apos;ll send you a link to reset your
            password.</CardDescription>
        )}
        {step === 2 && (
          <CardDescription>Enter the OTP/Reset Code sent to {emailForReset} and set your new password.</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <Form {...requestForm}>
            <form onSubmit={requestForm.handleSubmit(onRequestReset)} className="space-y-6">
              <FormField
                control={requestForm.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={requestForm.formState.isSubmitting}>
                {requestForm.formState.isSubmitting ? "Sending..." : "Send Reset Link"}
                {!requestForm.formState.isSubmitting && <Send className="ml-2 h-4 w-4"/>}
              </Button>
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...resetForm}>
            <form onSubmit={resetForm.handleSubmit(onResetPassword)} className="space-y-6">
              <FormField
                control={resetForm.control}
                name="otp"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>OTP or Reset Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter OTP or Reset Code" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={resetForm.control}
                name="newPassword"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={resetForm.control}
                name="confirmNewPassword"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm new password" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={resetForm.formState.isSubmitting}>
                {resetForm.formState.isSubmitting ? "Resetting..." : "Reset Password"}
                {!resetForm.formState.isSubmitting && <KeyRound className="ml-2 h-4 w-4"/>}
              </Button>
            </form>
          </Form>
        )}
        <div className="mt-6 text-center">
          <Link to="/sign-in" className="text-sm text-primary hover:underline inline-flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4"/>
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
