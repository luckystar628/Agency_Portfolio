"use client";

import { useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  ClockIcon,
} from "lucide-react";



export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Add Calendly script when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={`fixed top-[50%] -translate-y-[50%] right-[50%] translate-x-[50%] z-50 w-full h-auto ${true ? "" : "invisible"}`}>
      <div
        className="calendly-inline-widget w-full h-full"
        data-url="https://calendly.com/luckystar000628/introduction"
        style={{ minWidth: 320 + "px", height: 730 + "px" }}
      />
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
      ></script>
    </div>
  );
}
