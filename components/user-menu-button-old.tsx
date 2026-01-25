import { siteConfig } from "@/config/site"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MenuIcon } from "./icons/menu"
import { UserCircleIcon } from "./icons/user-circle"
import { Button } from "./ui/button"

export function UserMenuButton() {
  const githubUrl = siteConfig.links.github

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="p-1">
          <div className="flex items-center justify-center text-neutral-800">
            <MenuIcon className="mr-1.5 size-4 shrink-0" />
            <UserCircleIcon className="size-6 shrink-0 md:size-7 xl:size-[30px]" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 sm:w-48 lg:w-52"
        collisionPadding={20}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <a href="/sign-up" className="w-full">Sign up</a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a href="/sign-in" className="w-full">Log in</a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <a href="#" className="w-full">Gift Cards</a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href={githubUrl}
              className="w-full"
              target="_blank"
              rel="noreferrer"
            >
              Help Center
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
