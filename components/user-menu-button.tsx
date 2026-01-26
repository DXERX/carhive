"use client"

import { useUser, SignOutButton } from "@clerk/nextjs"
import Image from "next/image"

import { siteConfig } from "@/config/site"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MenuIcon } from "./icons/menu"
import { UserCircleIcon } from "./icons/user-circle"
import { Button } from "./ui/button"
import { useLocale } from "@/hooks/use-locale"
import { getTranslations } from "@/lib/i18n"

export function UserMenuButton() {
  const { isSignedIn, user } = useUser()
  const githubUrl = siteConfig.links.github
  const { locale } = useLocale()
  const { userMenu } = getTranslations(locale)

  // Check if user is admin
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || []
  const isAdmin = user?.emailAddresses.some(email => 
    adminEmails.includes(email.emailAddress)
  )

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="p-1">
          <div className="flex items-center justify-center text-neutral-800">
            <MenuIcon className="mr-1.5 size-4 shrink-0" />
            {isSignedIn && user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.fullName || user.emailAddresses[0]?.emailAddress || "User"}
                width={30}
                height={30}
                className="size-6 shrink-0 rounded-full object-cover md:size-7 xl:size-[30px]"
              />
            ) : (
              <UserCircleIcon className="size-6 shrink-0 md:size-7 xl:size-[30px]" />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 sm:w-48 lg:w-52"
        collisionPadding={20}
      >
        {isSignedIn ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.fullName || userMenu.account}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <a href="/dashboard" className="w-full">{userMenu.dashboard}</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/bookings" className="w-full">{userMenu.myBookings}</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/profile" className="w-full">{userMenu.profileSettings}</a>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem>
                  <a href="/admin" className="w-full font-semibold text-orange-600">{userMenu.adminDashboard}</a>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <a href="#" className="w-full">{userMenu.helpCenter}</a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutButton>
                <button className="w-full text-left">{userMenu.signOut}</button>
              </SignOutButton>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <a href="/sign-up" className="w-full">{userMenu.signUp}</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/sign-in" className="w-full">{userMenu.logIn}</a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <a href="#" className="w-full">{userMenu.giftCards}</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a
                  href={githubUrl}
                  className="w-full"
                  target="_blank"
                  rel="noreferrer"
                >
                  {userMenu.helpCenter}
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
