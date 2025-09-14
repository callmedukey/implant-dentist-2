"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import inside1 from "@/public/inside/1.jpg";
import inside10 from "@/public/inside/10.jpg";
import inside2 from "@/public/inside/2.jpg";
import inside3 from "@/public/inside/3.jpg";
import inside4 from "@/public/inside/4.jpg";
import inside5 from "@/public/inside/5.jpg";
import inside6 from "@/public/inside/6.jpg";
import inside7 from "@/public/inside/7.jpg";
import inside8 from "@/public/inside/8.jpg";
import inside9 from "@/public/inside/9.jpg";

const carouselImages = [
  { id: 1, src: inside1, alt: "조은이플란트치과 대기실" },
  { id: 2, src: inside2, alt: "조은이플란트치과 진료실" },
  { id: 3, src: inside3, alt: "조은이플란트치과 상담실" },
  { id: 4, src: inside4, alt: "조은이플란트치과 수술실" },
  { id: 5, src: inside5, alt: "조은이플란트치과 엑스레이실" },
  { id: 6, src: inside6, alt: "조은이플란트치과 치료실" },
  { id: 7, src: inside7, alt: "조은이플란트치과 복도" },
  { id: 8, src: inside8, alt: "조은이플란트치과 안내데스크" },
  { id: 9, src: inside9, alt: "조은이플란트치과 회복실" },
  { id: 10, src: inside10, alt: "조은이플란트치과 진료 공간" },
];

export const ClinicCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full max-w-[69.375rem] mt-16 md:mt-24 mb-8"
    >
      <div className="relative w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {carouselImages.map((image) => (
              <CarouselItem key={image.id}>
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[680px] rounded-lg overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    placeholder="blur"
                    quality={100}
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Previous Button */}
          <CarouselPrevious
            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-primary hover:bg-dark-secondary transition-colors border-0 text-white [&>svg]:size-8"
            variant="ghost"
          />

          {/* Custom Next Button */}
          <CarouselNext
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-primary hover:bg-dark-secondary transition-colors border-0 text-white [&>svg]:size-8"
            variant="ghost"
          />
        </Carousel>

        {/* Thumbnail Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4"
        >
          <ScrollArea className="w-full whitespace-nowrap rounded-lg">
            <div className="flex gap-3 p-1">
              {carouselImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => {
                    api?.scrollTo(index);
                  }}
                  className={`relative flex-shrink-0 w-[101px] h-[88px] rounded-lg overflow-hidden transition-all ${
                    currentIndex === index
                      ? "ring-2 ring-teal-secondary"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={100}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.div>
      </div>
    </motion.div>
  );
};
