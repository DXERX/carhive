import dynamic from "next/dynamic"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "./components/hero"
import { VipServices } from "./components/vip-services"

// Lazy load below-the-fold components for better initial page load
const BrowseCarTypes = dynamic(() => import("./components/browse-car-types").then(mod => ({ default: mod.BrowseCarTypes })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
})

const PopularDestinations = dynamic(() => import("./components/popular-destinations").then(mod => ({ default: mod.PopularDestinations })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
})

const Features = dynamic(() => import("./components/features").then(mod => ({ default: mod.Features })), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
})

const Testimonials = dynamic(() => import("./components/testimonials").then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
})

const CallToAction = dynamic(() => import("./components/call-to-action").then(mod => ({ default: mod.CallToAction })), {
  loading: () => <div className="h-48 animate-pulse bg-gray-100" />,
})

// Enable static generation with revalidation for better caching
export const revalidate = 3600 // Revalidate every hour

export default function HomePage() {
  return (
    <>
      <div className="sticky top-0 z-40 bg-[hsla(0,0%,100%,.8)] shadow-[inset_0_-1px_0_0_#eaeaea] backdrop-blur-[5px] backdrop-saturate-[1.8]">
        <div className="mx-auto h-[var(--site-header-height)] w-full max-w-none px-5 sm:max-w-[90%] sm:px-0 2xl:max-w-8xl">
          <SiteHeader />
        </div>
      </div>
      <main>
        <Hero />
        <div className="py-12 lg:py-16">
          <VipServices />
        </div>
        <div className="pt-12 lg:pt-14">
          <BrowseCarTypes />
        </div>
        <div className="py-12 lg:py-16">
          <PopularDestinations />
        </div>
        <div className="border-y border-neutral-900/5">
          <div className="py-12 md:py-16">
            <Features />
          </div>
        </div>
        <div className="pt-12 lg:pt-14">
          <Testimonials />
        </div>
        <div className="pb-12 pt-24 sm:pb-20 sm:pt-36">
          <CallToAction />
        </div>
      </main>
    </>
  )
}
