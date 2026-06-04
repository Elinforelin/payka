import {createFileRoute, useNavigate} from "@tanstack/react-router";
import {ArrowRight, } from "lucide-react";
import { createServerFn } from "@tanstack/react-start";
import { prisma } from "@/lib/prisma";

import img1 from "@/assets/619792737_18417153727189140_5984683189343682714_n.jpg";
import img2 from "@/assets/521469718_18391966183189140_5158185447317376143_n.jpg";

const getProducts = createServerFn({ method: "GET" }).handler(async () => {
  return await prisma.product.findMany();
});

export const Route = createFileRoute("/")({
  loader: async () => await getProducts(),
  component: LandingPage,
});

function LandingPage() {
    const navigate = useNavigate()
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#fdfaf7] px-6 py-10">
        <div className="relative mb-12 h-[400px] w-full max-w-lg">
          <div className="absolute top-0 left-0 w-[60%] overflow-hidden rounded-lg shadow-2xl">
            <img src={img1} alt="Jewelry 1" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-[60%] overflow-hidden rounded-lg shadow-2xl">
            <img src={img2} alt="Jewelry 2" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="max-w-xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-[#1a1a1a] md:text-6xl">
            Find Your <br />
            <span className="text-[#b3917d]">Perfect</span> Sparkle
          </h1>
          <p className="mt-6 text-lg text-[#6b5f59]">
            Find your perfect gems and elevate your look effortlessly.
          </p>

          <button
            onClick={() => navigate({ to: "/catalog" })}
            className="mt-10 flex items-center justify-between rounded-full bg-[#b3917d] py-4 pl-8 pr-4 text-xl font-medium text-white transition-all hover:bg-[#a3816d] w-full max-w-sm mx-auto"
          >
            <span>Get Started</span>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#b3917d]">
              <ArrowRight className="h-6 w-6" />
            </div>
          </button>
        </div>
      </main>
    );
  }

