import { siteConfig } from "@/config/site"
import { getLocale } from "@/lib/get-locale"
import { getTranslations } from "@/lib/i18n"

import { LogoLink } from "./logoLink"
import { Button } from "./ui/button"

export function SiteFooter() {
  const locale = getLocale()
  const { footer } = getTranslations(locale)
  const githubUrl = siteConfig.links.github

  // Define URLs for each footer link section
  const sectionLinks: Record<string, string[]> = {
    AVIS: ["https://www.avis.com"],
    Services: [
      "/cars",
      "/insurance",
      "/corporate",
      "/special-offers",
      "/faqs",
    ],
    Resources: [
      "/help-center",
      "/privacy-policy",
      "/terms-of-service",
      "/accessibility",
      "/vehicle-guides",
      "/testimonials",
    ],
    Company: [
      "/about",
      "/contact",
      "/blog",
      "/partners",
      "/customers",
      "/careers",
      "/press",
    ],
    Social: [
      "https://youtube.com/avis",
      "https://twitter.com/avis",
      "https://instagram.com/avis",
      "https://facebook.com/avis",
    ],
  }

  return (
    <footer className="border-t border-black/[0.06] py-12">
      <div className="mx-auto w-full max-w-none px-5 text-sm sm:max-w-[90%] sm:px-0 xl:max-w-5xl">
        <div className="grid grid-cols-12 items-start justify-center gap-y-11">
          <div className="col-span-full md:col-span-3">
            <LogoLink />
          </div>
          <nav className="col-span-full grid grid-cols-12 gap-x-6 gap-y-11 md:col-span-9">
            {footer.sections.map((section) => (
              <ul
                key={section.title}
                className="col-span-6 flex flex-col gap-3 md:col-span-3 lg:gap-3"
              >
                <div className="pb-1.5">
                  <h2 className="whitespace-nowrap text-balance font-semibold leading-none text-neutral-950">
                    {section.title}
                  </h2>
                </div>
                {section.links.map((link, idx) => (
                  <li key={link} className="text-neutral-600">
                    <Button
                      variant={"link"}
                      className="h-auto text-balance rounded-none p-0 text-[13px] font-normal leading-none sm:text-sm"
                      asChild
                    >
                      <a
                        href={sectionLinks[section.title]?.[idx] || "#"}
                        target={section.title === "Social" || section.title === "AVIS" ? "_blank" : undefined}
                        rel={section.title === "Social" || section.title === "AVIS" ? "noreferrer" : undefined}
                      >
                        {link}
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
          <div className="col-span-full">
            <p className="text-[13px] leading-6 text-neutral-600 sm:text-sm">
              {footer.builtBy}{" "}
              <Button
                variant={"link"}
                className="h-auto rounded-none p-0 text-[13px] font-normal leading-none sm:text-sm"
                asChild
              >
                <a
                  href={siteConfig.author.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong>eduamdev</strong>
                </a>
              </Button>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
