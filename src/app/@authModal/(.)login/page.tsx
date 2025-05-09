import AuthModal from "@/app/(UserAuth)/_sections/AuthModal";

export default function InterceptedLoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <AuthModal />
    </div>
  );
}
