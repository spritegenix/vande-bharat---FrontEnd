import React from "react";
import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/layout/footer/LandingFooter";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <LandingHeader />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 pt-5 text-3xl font-bold">Terms of Service</h1>
        <div className="prose prose-neutral max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing our website, you agree to be bound by these Terms of Service and to
              comply with all applicable laws and regulations. If you do not agree with these terms,
              you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the materials (information
              or software) on Vande Bharat's website for personal, non-commercial transitory viewing
              only. This is the grant of a license, not a transfer of title, and under this license
              you may not:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>modify or copy the materials;</li>
              <li>
                use the materials for any commercial purpose, or for any public display (commercial
                or non-commercial);
              </li>
              <li>
                attempt to decompile or reverse engineer any software contained on Vande Bharat's
                website;
              </li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>
                transfer the materials to another person or "mirror" the materials on any other
                server.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">3. Disclaimer</h2>
            <p className="mb-4">
              The materials on Vande Bharat's website are provided on an 'as is' basis. Vande Bharat
              makes no warranties, expressed or implied, and hereby disclaims and negates all other
              warranties including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or non-infringement of intellectual
              property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">4. Limitations</h2>
            <p className="mb-4">
              In no event shall Vande Bharat or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business
              interruption) arising out of the use or inability to use the materials on Vande
              Bharat's website, even if Vande Bharat or a Vande Bharat authorized representative has
              been notified orally or in writing of the possibility of such damage.
            </p>
          </section>
        </div>
      </div>
      <LandingFooter />
    </main>
  );
}
