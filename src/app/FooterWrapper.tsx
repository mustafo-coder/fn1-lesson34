"use client";
import React from "react";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const FooterWrapper = () => {
  const path = usePathname();

  return <div>{path != "/login" && <Footer />}</div>;
};

export default FooterWrapper;
