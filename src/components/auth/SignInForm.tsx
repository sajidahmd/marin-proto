import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {Link} from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

const signInFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

const defaultValues: Partial<SignInFormValues> = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const { toast } = useToast();
  // const router = useRouter(); // Initialize router
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: SignInFormValues) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    console.log("Sign in data:", data);
    toast({
      title: "Signed In Successfully!",
      description: "Redirecting to dashboard...",
    });
    // form.reset(); // Optionally reset form
    // router.push('/dashboard'); // Redirect to dashboard
  }

  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
              {!form.formState.isSubmitting && <LogIn className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/apply-for-membership" className="text-primary hover:underline">
            Apply for Membership
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

    