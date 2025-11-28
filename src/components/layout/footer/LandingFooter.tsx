import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LandingFooter() {
  return (
    <footer id="footer" className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <Image src="/logoBlack.png" alt="Logo" width={250} height={100} />
            </div>
            <p className="text-sm text-neutral-600">
              Connecting communities to celebrate and preserve Bharat's cultural heritage.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-neutral-900">Platform</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="/community">
                  <span className="cursor-pointer hover:text-neutral-900">Communities</span>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <span className="cursor-pointer hover:text-neutral-900">Events</span>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <span className="cursor-pointer hover:text-neutral-900">Resources</span>
                </Link>
              </li>
              <li>
                <Link href="/forums">
                  <span className="cursor-pointer hover:text-neutral-900">Forums</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-neutral-900">Support</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <span className="cursor-pointer hover:text-neutral-900">Help Center</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-neutral-900">Guidelines</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-neutral-900">Contact Us</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-neutral-900">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="/privacy-policy">
                  <span className="cursor-pointer hover:text-neutral-900">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service">
                  <span className="cursor-pointer hover:text-neutral-900">Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-200 pt-8 text-center text-sm text-neutral-600">
          <p>
            © 2025 Vande Bharat Venture. All rights reserved. Designed and Developed by{" "}
            <a href="https://spritegenix.com" target="_blank" rel="noopener noreferrer">
              SpriteGenix
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
