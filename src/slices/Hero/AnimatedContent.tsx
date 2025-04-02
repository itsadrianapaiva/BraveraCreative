"use client";

import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";
import BackgroundVideo from "@/components/BackgroundVideo";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const AnimatedContent = ({ slice }: { slice: Content.HeroSlice }) => {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      console.log("Prefers Reduced Motion:", prefersReducedMotion);

      if (prefersReducedMotion) {
        gsap.set(".hero__logo, .hero__heading, .hero__button, .hero__arrow", {
          opacity: 1,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(
        ".hero__logo",
        { scale: 3.5 },
        { scale: 1, duration: 1.8, opacity: 0.8, ease: "back.out" },
      );
      tl.fromTo(
        ".hero__heading",
        { scale: 0.5 },
        { scale: 1, duration: 1.2, opacity: 1 },
        "-=0.6",
      );
      tl.fromTo(
        ".hero__button",
        { scale: 1.2 },
        { scale: 1, duration: 1.3, opacity: 1 },
        "-=0.8",
      );
      tl.fromTo(".hero__arrow", { y: 50 }, { y: 0, duration: 1, opacity: 0.2 });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      {/* Reusable Background Video */}
      <BackgroundVideo height="h-full" opacity="opacity-90" />

      <PrismicNextImage
        field={slice.primary.logo}
        className="hero__logo absolute left-1/2 top-[15%] -translate-x-1/2 -translate-y-1/2 opacity-0"
      />

      {/* Content Layer */}
      <div className="top-3/5 absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6 text-center text-white">
        {isFilled.image(slice.primary.business_name) && (
          <h1 className="hero__heading text-5xl font-medium opacity-0 md:text-7xl">
            <PrismicNextImage field={slice.primary.business_name} />
          </h1>
        )}

        {isFilled.link(slice.primary.button) && (
          <ButtonLink
            className="hero__button opacity-0"
            field={slice.primary.button}
          >
            {/* Show shorter text on mobile, full text on desktop */}
            <span className="inline md:hidden">Let&apos;s Grow</span>
            <span className="hidden md:inline">
              {slice.primary.button_label}
            </span>
          </ButtonLink>
        )}
      </div>

      {isFilled.image(slice.primary.arrow_down) && (
        <PrismicNextImage
          field={slice.primary.arrow_down}
          className="hero__arrow absolute bottom-5 left-1/2 h-16 w-16 -translate-x-1/2 opacity-0 md:h-24 md:w-24"
        />
      )}
    </div>
  );
};

export default AnimatedContent;
