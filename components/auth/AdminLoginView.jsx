import LoginIntro from "@/components/auth/LoginIntro";
import AdminLoginForm from "@/components/auth/AdminLoginForm";

export default function AdminLoginView() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <LoginIntro />
      <AdminLoginForm />
    </div>
  );
}
