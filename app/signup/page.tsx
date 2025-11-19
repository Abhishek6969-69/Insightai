import { redirect } from "next/navigation";

export default function SignupPage() {
    // Redirect to the auth signup page which contains the actual UI
    redirect("/auth/signup");
}