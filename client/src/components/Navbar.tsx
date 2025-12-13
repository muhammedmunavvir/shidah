"use client";

import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Moon,
  Sun,
  Heart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/store/useAuthstore";
import { useCartStore } from "@/store/userCartstore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Playwrite_NO } from "next/font/google";
import { useAuthInit } from "@/hooks/useAuthInit";
import { logoutapi } from "@/api/logout";
import { useWishlistStore } from "@/store/wishliststore";

const playwrite = Playwrite_NO({
  style: ["normal"],
  weight: ["400"],
});

export default function Navbar() {
  useAuthInit();

  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const { items, Getitem } = useCartStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
const { items: wishlistItems, fetchWishlist } = useWishlistStore();

useEffect(() => {
  if (user?._id) {
    Getitem();        // cart
    fetchWishlist(); // wishlist
  }
}, [user, Getitem, fetchWishlist]);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        setIsScrolled(true);
        setIsSearchOpen(false);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Products", href: "/allproducts" },
    { name: "Categories", href: "#" },
    { name: "Deals", href: "#" },
    { name: "About", href: "/aboutpage" },
    { name: "Contact", href: "#" },
  ];

  const handleLogin = () => router.push("/auth/googleauth");

  async function handleLogout() {
    try {
      await logoutapi();
      logout();
    } catch (error) {
      console.log("Logout error:", error);
    }
  }

  return (
    <nav
      suppressHydrationWarning
      style={{ borderWidth: "0 0.5px 0.5px 0.5px" }}
      className={`
          sticky top-0 z-50 mx-auto bg-white-50 dark:bg-black/70 backdrop-blur-lg
          border border-amber-300 rounded-lg
          transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? "w-3/4 max-w-xl scale-90 py-1"
              : "w-full rounded-none border-none scale-100 py-0"
          }
        `}
    >
      <div className={`container mx-auto ${isScrolled ? "px-4" : "px-6"}`}>
        <div
          className={`flex items-center justify-between ${
            isScrolled ? "h-12" : "h-16"
          }`}
        >
          {/* Logo */}
          {/* <div className="flex items-center space-x-3 flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                {/* image container must be relative for next/image fill 
                <div
                  className={`relative overflow-hidden rounded-md flex items-center justify-center
                    ${isScrolled ? "h-6 w-6" : "h-8 w-8"}
                  `}
                  aria-hidden={false}
                >
                  <img
                    src="https://res.cloudinary.com/dwypehszo/image/upload/v1764398757/Group_1_qnswwg.jpg"
                    alt="Shidah logo"
                    sizes={isScrolled ? "24px" : "32px"}
                    className="object-contain"
                    
                  />
                </div>

              </Link>
            </div> */}

          <div className="flex items-center space-x-2 flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div
                className={`${playwrite.className} text-xl font-semibold dark:text-white text-black`}
              >
                Shidah<span className="italic ml-1">.in</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div
            className={`
                hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2
                ${isScrolled ? "scale-90" : "scale-100"}
              `}
          >
            <div className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                      font-medium text-black-500 relative group
                      ${isScrolled ? "text-xs" : "text-sm"}
                    `}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-black-600" />
              )}
            </Button>

            {/* Desktop Search */}
            {!isScrolled && (
              <div className="hidden sm:flex items-center w-40 justify-end">
                {isSearchOpen ? (
                  <div className="flex items-center space-x-2 w-full">
                    <Input
                      type="text"
                      placeholder="Search..."
                      className="h-8 rounded-sm flex-1"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-white/10"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="h-5 w-5 text-black dark:text-white" />
                  </Button>
                )}
              </div>
            )}

            {/* Mobile Search */}
            {!isScrolled && (
              <Button variant="ghost" size="icon" className="hidden">
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Cart */}
            {user && (
              <Button
                variant="ghost"
                size="icon"
                className={`relative hover:bg-white/10 ${
                  isScrolled ? "h-8 w-8" : "h-10 w-10"
                }`}
                onClick={() => router.push("/usercart")}
              >
                <ShoppingCart
                  className={`text-black dark:text-white ${
                    isScrolled ? "h-4 w-4" : "h-5 w-5"
                  }`}
                />
                <span
                  className={`
                      absolute rounded-full bg-red-500 text-white flex items-center justify-center
                      ${
                        isScrolled
                          ? "-top-1 -right-1 h-3 w-3 text-[8px]"
                          : "-top-1 -right-1 h-4 w-4 text-[10px]"
                      }
                    `}
                >
                  {items.length}
                </span>
              </Button>
            )}

            {/* Wishlist */}
            {user && (
              <Button
                variant="ghost"
                size="icon"
                className={`relative hover:bg-white/10 ${
                  isScrolled ? "h-8 w-8" : "h-10 w-10"
                }`}
                onClick={() => router.push("/wishlist")}
              >
                <Heart
                  className={`text-black dark:text-white ${
                    isScrolled ? "h-4 w-4" : "h-5 w-5"
                  }`}
                />

                {wishlistItems.length > 0 && (
                  <span
                    className={`
          absolute rounded-full bg-pink-500 text-white flex items-center justify-center
          ${
            isScrolled
              ? "-top-1 -right-1 h-3 w-3 text-[8px]"
              : "-top-1 -right-1 h-4 w-4 text-[10px]"
          }
        `}
                  >
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            )}

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`hover:bg-white/10 ${
                      isScrolled ? "h-8 w-8" : "h-10 w-10"
                    }`}
                  >
                    <User
                      className={`text-black dark:text-white ${
                        isScrolled ? "h-4 w-4" : "h-5 w-5"
                      }`}
                    />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem>
                    <img
                      referrerPolicy="no-referrer"
                      src={user?.avatar || "/default-avatar.png"}
                      alt="profile"
                      className="mr-2 h-7 w-7 rounded-full object-cover"
                    />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/myOrders" className="flex items-center">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                className={`
                    bg-gray-100 rounded-sm dark:text-black
                    ${isScrolled ? "h-7 px-2 text-xs" : "h-8 px-3 text-sm"}
                  `}
                onClick={handleLogin}
              >
                Sign in
              </button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`md:hidden hover:bg-muted ${
                    isScrolled ? "h-8 w-8" : "h-10 w-10"
                  }`}
                >
                  <Menu className={isScrolled ? "h-4 w-4" : "h-5 w-5"} />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="
                  pointer-events-auto

                  w-80 p-6 h-full overflow-y-auto tracking-wide
                bg-white/20 dark:bg-white/10 
                  backdrop-blur-xl
                  border border-white/20 dark:border-white/10
                shadow-[0_8px_32px_rgba(0,0,0,0.2)]
              rounded-2xl
  "
              >
                {/* Logo */}
                {/* <div className="flex items-center space-x-2 flex-shrink-0">
                    <Link href="/" className="flex items-center">
                      <div
                        className={`${playwrite.className} text-xl font-semibold dark:text-white text-black`}
                      >
                        Shidah<span className="italic ml-1">.in</span>
                      </div>
                    </Link>
                  </div> */}

                {/* Navigation Items */}
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-white-400  "
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Divider */}
                <div className="border-t border-white/20 my-6" />

                {/* Actions */}
                <div className="flex flex-col space-y-4">
                  <Button
                    variant="ghost"
                    className="justify-start text-black dark:text-white"
                  >
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-black dark:text-white"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Cart (
                    {items.length})
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-black dark:text-white"
                    onClick={() => router.push("/wishlist")}
                  >
                    <Heart className="mr-2 h-4 w-4" /> Wishlist (
                    {wishlistItems.length})
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start text-black dark:text-white"
                  >
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
