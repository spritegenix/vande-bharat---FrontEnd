"use client";
import React from "react";
import LandingHeader from "./LandingHeader";
import {
  Users,
  Calendar,
  BookOpen,
  Filter,
  Heart,
  MessageCircle,
  Share2,
  Landmark,
  Scroll,
  Microscope,
  History,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="text-base-content h-full bg-white">
      <LandingHeader />
      <div id="main-content">
        <section id="hero-section" className="relative flex h-[600px] items-center overflow-hidden">
          <div className="hero-background-overlay absolute inset-0"></div>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="mb-6 text-4xl text-neutral-900 md:text-6xl">
              Celebrating Bharat's Rich Heritage
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-white">
              Join a vibrant community of researchers, temple authorities, historians, and cultural
              enthusiasts united in preserving and evolving India's spiritual and cultural legacy.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/community"
                className="rounded-lg bg-neutral-900 px-8 py-3 text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
              >
                Join Community
              </Link>
              <Link href="/feed">
                <button className="rounded-lg border border-neutral-300 bg-white/80 px-8 py-3 text-neutral-900 shadow-md transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg">
                  Explore Platform
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features-section" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl text-neutral-900">Platform Features</h2>
              <p className="mx-auto max-w-2xl text-neutral-600">
                Discover tools designed to connect, collaborate, and celebrate Bharat's cultural
                heritage
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border border-neutral-200 bg-white p-6 transition-all hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-600">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="mb-2 text-xl text-neutral-900">Community Forums</h3>
                <p className="text-neutral-600">
                  Engage in meaningful discussions with researchers, historians, and cultural
                  enthusiasts
                </p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-6 transition-all hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-600">
                  <Calendar className="text-white" size={24} />
                </div>
                <h3 className="mb-2 text-xl text-neutral-900">Cultural Events</h3>
                <p className="text-neutral-600">
                  Discover and participate in events celebrating India's spiritual and cultural
                  heritage
                </p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-6 transition-all hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-600">
                  <BookOpen className="text-white" size={24} />
                </div>
                <h3 className="mb-2 text-xl text-neutral-900">Resource Library</h3>
                <p className="text-neutral-600">
                  Access curated research papers, historical findings, and cultural resources
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="dashboard-section" className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-4">
              <div className="lg:col-span-3">
                <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg text-neutral-900">Personalized Feed</h3>
                    <button className="text-neutral-500 hover:text-neutral-700">
                      <Filter size={20} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="border-b border-neutral-100 pb-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=456"
                          alt="Author"
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="mb-1 flex items-center space-x-2">
                            <span className="text-neutral-900">Dr. Priya Sharma</span>
                            <span className="text-sm text-neutral-500">• Historian</span>
                          </div>
                          <p className="mb-2 text-neutral-700">
                            New research findings on ancient temple architecture in South India...
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-neutral-500">
                            <button className="hover:text-neutral-700">
                              <Heart className="mr-1" size={16} />
                              24
                            </button>
                            <button className="hover:text-neutral-700">
                              <MessageCircle className="mr-1" size={16} />8
                            </button>
                            <button className="hover:text-neutral-700">
                              <Share2 className="mr-1" size={16} />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-neutral-100 pb-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=789"
                          alt="Author"
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="mb-1 flex items-center space-x-2">
                            <span className="text-neutral-900">Shri Ram Temple Trust</span>
                            <span className="text-sm text-neutral-500">• Temple Authority</span>
                          </div>
                          <p className="mb-2 text-neutral-700">
                            Upcoming cultural festival celebrating traditional arts and crafts...
                          </p>
                          <div className="mb-2 flex h-[450px] w-full items-center rounded-lg">
                            <Image
                              src="/images/cultural_festival_realistic.webp"
                              alt="Event"
                              width={450}
                              height={100}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-neutral-500">
                            <button className="hover:text-neutral-700">
                              <Heart className="mr-1" size={16} />
                              156
                            </button>
                            <button className="hover:text-neutral-700">
                              <MessageCircle className="mr-1" size={16} />
                              32
                            </button>
                            <button className="hover:text-neutral-700">
                              <Share2 className="mr-1" size={16} />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg border border-neutral-200 bg-white p-4">
                  <h4 className="mb-3 text-neutral-900">Active Communities</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-600">
                        <Landmark className="text-white" size={12} />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-900">Temple Historians</p>
                        <p className="text-xs text-neutral-500">2.3k members</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-600">
                        <Scroll className="text-white" size={12} />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-900">Cultural Research</p>
                        <p className="text-xs text-neutral-500">1.8k members</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white p-4">
                  <h4 className="mb-3 text-neutral-900">Upcoming Events</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-neutral-600 pl-3">
                      <p className="text-sm text-neutral-900">Heritage Walk</p>
                      <p className="text-xs text-neutral-500">March 15, 2025</p>
                    </div>
                    <div className="border-l-4 border-neutral-600 pl-3">
                      <p className="text-sm text-neutral-900">Spiritual Discourse</p>
                      <p className="text-xs text-neutral-500">March 18, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="stakeholder-section" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl text-neutral-900">Join Our Community</h2>
              <p className="mx-auto max-w-2xl text-neutral-600">
                Connect with diverse stakeholders dedicated to preserving Bharat's heritage
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-neutral-200 bg-white p-6 text-center transition-all hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-600">
                  <Microscope className="text-white" size={32} />
                </div>
                <h3 className="mb-2 text-lg text-neutral-900">Researchers</h3>
                <p className="text-sm text-neutral-600">
                  Share findings and collaborate on cultural research
                </p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-6 text-center transition-all hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-600">
                  <Landmark className="text-white" size={32} />
                </div>
                <h3 className="mb-2 text-lg text-neutral-900">Temple Authorities</h3>
                <p className="text-sm text-neutral-600">
                  Organize events and share spiritual insights
                </p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-6 text-center transition-all hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-600">
                  <History className="text-white" size={32} />
                </div>
                <h3 className="mb-2 text-lg text-neutral-900">Historians</h3>
                <p className="text-sm text-neutral-600">
                  Document and preserve historical narratives
                </p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-6 text-center transition-all hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-600">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="mb-2 text-lg text-neutral-900">Cultural Societies</h3>
                <p className="text-sm text-neutral-600">
                  Promote cultural activities and traditions
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="cta-section" className="bg-neutral-900 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl text-white">Ready to Join the Movement?</h2>
            <p className="mb-8 text-neutral-300">
              Be part of a community dedicated to celebrating and preserving Bharat's rich cultural
              heritage
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {/* <button className="rounded-lg bg-white px-8 py-3 text-neutral-900 transition-colors hover:bg-neutral-100">
                Register as Stakeholder
              </button> */}
              <Link
                href="/login"
                className="rounded-lg border border-neutral-600 px-8 py-3 text-white transition-colors hover:bg-neutral-800"
              >
                Join as Member
              </Link>
            </div>
          </div>
        </section>
      </div>

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
                  <span className="cursor-pointer hover:text-neutral-900">Privacy Policy</span>
                </li>
                <li>
                  <span className="cursor-pointer hover:text-neutral-900">Terms of Service</span>
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
    </main>
  );
}
