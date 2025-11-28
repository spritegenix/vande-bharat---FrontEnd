import React from "react";
import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/layout/footer/LandingFooter";

export default function PrivacyPolicy() {
  return (
    <>
      <main className="min-h-screen bg-white text-neutral-900">
        <LandingHeader />
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 pt-5 text-3xl font-bold">Privacy Policy</h1>
          <div className="prose prose-neutral max-w-none">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
              <p className="mb-4">
                Welcome to Vande Bharat. We respect your privacy and are committed to protecting
                your personal data. This privacy policy will inform you as to how we look after your
                personal data when you visit our website and tell you about your privacy rights and
                how the law protects you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">2. Data We Collect</h2>
              <p className="mb-4">
                We may collect, use, store and transfer different kinds of personal data about you
                which we have grouped together follows:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6">
                <li>
                  Identity Data includes first name, last name, username or similar identifier.
                </li>
                <li>Contact Data includes email address and telephone numbers.</li>
                <li>
                  Technical Data includes internet protocol (IP) address, your login data, browser
                  type and version, time zone setting and location, browser plug-in types and
                  versions, operating system and platform and other technology on the devices you
                  use to access this website.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">3. How We Use Your Data</h2>
              <p className="mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we
                will use your personal data in the following circumstances:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6">
                <li>
                  Where we need to perform the contract we are about to enter into or have entered
                  into with you.
                </li>
                <li>
                  Where it is necessary for our legitimate interests (or those of a third party) and
                  your interests and fundamental rights do not override those interests.
                </li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">4. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this privacy policy or our privacy practices, please
                contact us at: support@vandebharat.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <LandingFooter />
    </>
  );
}
