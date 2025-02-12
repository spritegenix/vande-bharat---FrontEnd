import Wrapper from "@/components/elements/Wrappers";
import { Metadata } from "next";
import { AuthModalCard } from "../_sections/AuthModal";

export const metadata: Metadata = {
  title: "Sign Up | Vande Bharat",
};

export default function SignUpPage() {
  return (
      <Wrapper isTop={true} className="mb-10 flex items-center justify-center">
       <AuthModalCard />
      </Wrapper>
  );
}
