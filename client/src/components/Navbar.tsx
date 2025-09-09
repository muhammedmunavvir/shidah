"use client"
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
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
export default function Navbar () {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { items, Getitem } = useCartStore();

  const logout = useAuthStore((state) => state.logout);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Fetch cart when Navbar mounts
  useEffect(() => {
    Getitem();
  }, [Getitem]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const handlelogin = () => {
    router.push("/auth/googleauth"); 
  };

  const handleLogout = () => {
    logout();
  };
  
  return (
    <nav
      style={{ borderWidth: "0 0.5px 0.5px 0.5px" }}
      className={`sticky top-0 z-50 mx-auto bg-black/70 backdrop-blur-lg
    border border-amber-300 rounded-lg
    transition-all duration-300 ease-in-out
    ${
      isScrolled
        ? "w-3/4 max-w-xl scale-90 py-1"
        : "w-full rounded-none border-none scale-100 py-0"
    }
  `}
    >
      <div className={`container mx-auto ${isScrolled ? 'px-4' : 'px-6'}`}>
        <div className={`flex items-center justify-between ${isScrolled ? 'h-12' : 'h-16'}`}>
          {/* Logo - Shrinks when scrolled */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <a href="#" className="flex items-center space-x-2">
              <div className={`rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center ${
                isScrolled ? 'h-6 w-6' : 'h-8 w-8'
              }`}>
                <span className={`text-white font-bold ${
                  isScrolled ? 'text-xs' : 'text-sm'
                }`}>S</span>
              </div>
              <span className={`font-bold text-white ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}>Shidah</span>
            </a>
          </div>

          {/* Desktop Navigation - Hidden when navbar is too small */}
          <div className={`hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 ${
            isScrolled ? 'scale-90' : 'scale-100'
          }`}>
            <div className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium text-fuchsia-400 hover:text-white relative group ${
                    isScrolled ? 'text-xs' : 'text-sm'
                  }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Actions - Adjust spacing when scrolled */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Search - Only show when not scrolled */}
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
                    <Search className="h-5 w-5 text-white" />
                  </Button>
                )}
              </div>
            )}

            {/* Mobile Search - Only show when not scrolled */}
            {!isScrolled && (
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden h-10 w-10 text-white hover:bg-white/10"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Cart */}
            {user?<Button
              variant="ghost"
              size="icon"
              className={`relative hover:bg-white/10 ${
                isScrolled ? 'h-8 w-8' : 'h-10 w-10'
              }`}
              onClick={()=>router.push("/usercart")}
            >
              <ShoppingCart className={`text-white ${
                isScrolled ? 'h-4 w-4' : 'h-5 w-5'
              }`} />
              <span className={`absolute rounded-full bg-red-500 text-white flex items-center justify-center ${
                isScrolled 
                  ? '-top-1 -right-1 h-3 w-3 text-[8px]' 
                  : '-top-1 -right-1 h-4 w-4 text-[10px]'
              }`}>
                {items.length}
              </span>
            </Button>:null}

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`hover:bg-white/10 ${
                      isScrolled ? 'h-8 w-8' : 'h-10 w-10'
                    }`}
                  >
                    <User className={`text-white ${
                      isScrolled ? 'h-4 w-4' : 'h-5 w-5'
                    }`} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button 
                className={`bg-gray-100 rounded-sm ${
                  isScrolled ? 'h-7 px-2 text-xs' : 'h-8 px-3 text-sm'
                }`} 
                onClick={handlelogin}
              >
                sign in
              </button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`md:hidden hover:bg-muted ${
                    isScrolled ? 'h-8 w-8' : 'h-10 w-10'
                  }`}
                >
                  <Menu className={isScrolled ? 'h-4 w-4' : 'h-5 w-5'} />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-80 p-6 h-full overflow-y-auto bg-black/90 text-white"
              >
                {/* Logo */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <span className="font-bold text-white text-lg">Shidah</span>
                </div>

                {/* Navigation Items */}
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-fuchsia-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>

                {/* Divider */}
                <div className="border-t border-white/20 my-6" />

                {/* Actions */}
                <div className="flex flex-col space-y-4">
                  <Button variant="ghost" className="justify-start text-white">
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                  <Button variant="ghost" className="justify-start text-white">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Cart (2)
                  </Button>
                  <Button variant="ghost" className="justify-start text-white">
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
}; 