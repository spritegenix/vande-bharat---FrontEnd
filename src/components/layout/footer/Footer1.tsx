import React from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import TextWithLineBreak from "@/utils/TextWithLineBreak";
import Wrapper from "@/components/elements/Wrappers";
import Logo from "@/components/elements/Logo";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

export default function Footer1({ footerData }: any) {
  return (
    <Wrapper
      as="footer"
      containerClassName="w-full text-black"
      className="pt-5 text-white md:pt-12"
      bgColor="bg-bg1"
    >
      {/* Footer links section  */}
      <div className="grid grid-cols-1 pb-5 md:grid-cols-10">
        {/* Footer Company About  */}
        <div className="col-span-3 flex flex-col gap-y-5 border-white/30 md:border-r-2 md:pr-16">
          <Logo mode="light" />
          <p className="mb-4 text-wrap max-sm:mt-3">
            <TextWithLineBreak text={footerData?.text} />
          </p>
        </div>
        <div className="col-span-7 grid grid-cols-1 justify-center gap-1 sm:grid-cols-2 md:pl-24">
          {/* Quick Links  */}
          <div className="flex flex-col gap-y-2">
            <h4 className="my-2 text-2xl font-semibold">{footerData?.list1?.title}</h4>
            <ul>
              {footerData?.list1?.links?.map((d: any, i: number) => (
                <li key={i}>
                  <Link
                    href={d?.href}
                    className="transition-all duration-300 hover:pl-2 hover:font-medium hover:text-zinc-900"
                  >
                    {d?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Us  */}
          <div className="flex flex-col">
            <h4 className="my-2 mb-3 text-2xl font-semibold">Contact Us</h4>
            <p className="mb-1.5">
              <Link
                href={`tel:${footerData?.contactDetails?.contactNo}`}
                className="flex items-center gap-2"
              >
                <FiPhone className="text-xl" />
                {footerData?.contactDetails?.contactNo}
              </Link>
            </p>
            <p>
              <Link
                href={`mailto:${footerData?.contactDetails?.email}`}
                className="flex items-center gap-2"
              >
                <MdOutlineEmail className="text-xl" /> {footerData?.contactDetails.email}
              </Link>
            </p>
            <h4 className="my-2 text-2xl font-semibold">Location</h4>
            <p className="flex items-center gap-2">
              <IoLocationOutline className="text-xl" />{" "}
              <TextWithLineBreak text={footerData?.contactDetails?.location} />
            </p>
          </div>
        </div>
      </div>
      {/* copyright  */}
      <div className="flex items-center justify-between gap-5 border-t-2 border-white/30 py-5 max-md:flex-col">
        <p className="text-center text-sm">
          Copyrights © {new Date().getFullYear()}{" "}
          <span className="font-medium">CyberSecurity</span>. All rights reserved. Designed and
          Developed by{" "}
          <Link
            target="_blank"
            className="font-medium hover:underline"
            href={"https://www.spritegenix.com/"}
          >
            Sprite Genix
          </Link>
          .{" "}
          <Link target="_blank" className="hover:underline" href={"/privacy-policy"}>
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link target="_blank" className="hover:underline" href={"/terms-and-conditions"}>
            Terms & Conditions
          </Link>
        </p>

        {/* Socials  */}
        {footerData?.socials && (
          <div className="flex-center gap-2 text-3xl text-white">
            {footerData?.socials?.facebook && (
              <FaFacebook
                className="social-icon cursor-pointer text-xl transition-all duration-300 hover:scale-110"
                onClick={() => window.open(footerData?.socials?.facebook, "_blank")}
              />
            )}
            {footerData?.socials?.instagram && (
              <AiFillInstagram
                className="social-icon cursor-pointer text-xl transition-all duration-300 hover:scale-110"
                onClick={() => window.open(footerData?.socials?.instagram, "_blank")}
              />
            )}
            {footerData?.socials?.linkedin && (
              <FaLinkedinIn
                className="social-icon cursor-pointer text-xl transition-all duration-300 hover:scale-110"
                onClick={() => window.open(footerData?.socials?.linkedin, "_blank")}
              />
            )}
            {footerData?.socials?.youtube && (
              <TbBrandYoutubeFilled
                className="social-icon cursor-pointer text-xl transition-all duration-300 hover:scale-110"
                onClick={() => window.open(footerData?.socials?.youtube, "_blank")}
              />
            )}
            {footerData?.socials?.twitter && (
              <FaXTwitter
                className="social-icon cursor-pointer text-xl transition-all duration-300 hover:scale-110"
                onClick={() => window.open(footerData?.socials?.twitter, "_blank")}
              />
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
