
import { Separator } from "@/components/ui/separator";
import DarkMode from "@/DarkMode";
import { useLogoutUserMutation } from "@/features/api/authApi";
import {
  Book,
  LayoutDashboard,
  LogOut,
  Menu,
  School,
  User,
} from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 bg-white dark:bg-[#020817] border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 z-50 shadow-sm">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center h-full px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <School className="text-blue-600 dark:text-blue-400" size={30} />
          <Link to="/">
            <h1 className="font-bold text-2xl text-gray-900 dark:text-white hover:text-blue-600 transition">
              MeroPathshala
            </h1>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-blue-500">
                  <AvatarImage
                    src={
                      user?.photoUrl ||
                      "https://avatars.githubusercontent.com/u/71966035?v=4"
                    }
                    alt="user"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/my-learning" className="flex items-center gap-2">
                      <Book size={16} /> My Learning
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User size={16} />Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 hover:text-red-700"
                    onClick={logoutHandler}
                  >
                    <LogOut size={16} className="mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2"
                      >
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="hover:border-blue-600 transition"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 transition"
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to="/" className="flex items-center gap-2">
          <School className="text-blue-600 dark:text-blue-400" />
          <h1 className="font-extrabold text-xl">MeroPathshala</h1>
        </Link>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full hover:bg-gray-100"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to="/" className="text-xl font-bold">
              MeroPathshala
            </Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="my-4" />
        <nav className="flex flex-col gap-4 text-base font-medium text-gray-800 dark:text-gray-100">
          <Link to="/my-learning">📘 My Learning</Link>
          <Link to="/profile">👤 Edit Profile</Link>
          {user?.role === "instructor" && (
            <Link to="/admin/dashboard">📊 Dashboard</Link>
          )}
          <button onClick={logoutHandler} className="text-left text-red-500">
            🚪 Logout
          </button>
        </nav>
        {!user && (
          <div className="mt-6 flex flex-col gap-3">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/login")}>Signup</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
