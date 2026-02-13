"use client";

import ImageWithBasePath from "@/components/ImageWithBasePath";

type CityCardProps = {
  city: string;
  image: string;
  alt: string;
};

export default function CityCard({ city, image, alt }: CityCardProps) {
  return (
    <div
      role="presentation"
      className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition hover:shadow-2xl cursor-default"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <ImageWithBasePath
          src={image}
          alt={alt}
          width={600}
          height={400}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-col items-start">
          <div className="relative -mb-3 ml-2 z-10">
            <ImageWithBasePath
              src="/images/locationIcon.png"
              alt=""
              width={48}
              height={48}
              className="h-10 w-10 object-contain drop-shadow-md sm:h-12 sm:w-12"
              aria-hidden
            />
          </div>
          <span className="rounded-xl bg-white/95 px-4 py-2.5 text-lg font-bold text-deep shadow-md backdrop-blur-sm">
            {city}
          </span>
        </div>
      </div>
    </div>
  );
}
