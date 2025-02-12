import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";

import { Metadata } from "next";
import { AuthModalCard } from "../_sections/AuthModal";

export const metadata: Metadata = {
  title: "Login | Vande Bharat",
};

export default function LoginPage() {
  return (
      <Wrapper isTop={true} className="mb-10 flex items-center justify-center">
        <AuthModalCard />
      </Wrapper>
  );
}
