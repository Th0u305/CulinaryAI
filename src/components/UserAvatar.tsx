"use client"

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon, HelpCircle, LogOut, Settings } from "lucide-react";
import Link from 'next/link';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import useAllData from '@/hooks/useAllData';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router'

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const {userData} = useAllData()  
  const router = useRouter()

  const handleClick = () => {
    router.push("/dashboard")
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9 transition-all duration-300 hover:ring-2 hover:ring-primary">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <UserIcon className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 glass" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData?.given_name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData?.email || "user@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Button onClick={handleClick}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span><LogoutLink>Log Out</LogoutLink></span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
UserAvatar.displayname="Avatar"
export default UserAvatar;