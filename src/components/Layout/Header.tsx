import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Avatar, Button, Drawer, Burger } from "@mantine/core";
import { PiSignOutLight } from "react-icons/pi";
import { IoHomeSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import useAuth from "@/utils/hooks/useAuth";
import useAuthStore from "@/store/slices/authSlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { image, username, email } = useAuthStore((state) => state);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully.");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="flex justify-between items-center p-4 md:px-32">
        <img
          src="/images/script-assist.png"
          alt="Script Assist"
          width={150}
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="md:hidden">
          <Burger
            opened={drawerOpened}
            onClick={() => setDrawerOpened((prev) => !prev)}
            aria-label="Open Menu"
            size="sm"
          />
        </div>
        <nav className="hidden md:flex items-center gap-4">
          <Menu>
            <Menu.Target>
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar
                  size="sm"
                  src={
                    image || "https://docs.material-tailwind.com/img/face-2.jpg"
                  }
                  alt="avatar"
                  radius="xl"
                />
                <span>{username}</span>
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <div className="border-b border-gray-300 mb-2"></div>{" "}
              {/* Horizontal line */}
              <Menu.Item>
                <div className="flex gap-3 items-center px-2 py-2">
                  {" "}
                  {/* Added padding */}
                  <Avatar
                    size="sm"
                    src={
                      image ||
                      "https://docs.material-tailwind.com/img/face-2.jpg"
                    }
                    alt="avatar"
                    radius="xl"
                  />
                  <div>
                    <div className="font-medium">{username}</div>{" "}
                    {/* Added styling */}
                    <div className="text-sm text-gray-500">{email}</div>
                  </div>
                </div>
              </Menu.Item>
              <div className="border-t border-gray-300 my-2"></div>{" "}
              {/* Separator line */}
              <Menu.Item onClick={handleSignOut}>
                <div className="flex gap-3 items-center px-2 py-2">
                  {" "}
                  {/* Added padding */}
                  <PiSignOutLight size={18} />
                  <span>Sign Out</span>
                </div>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </nav>
      </div>

      {/* Drawer for Smaller Screens */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title="Menu"
        padding="md"
        size="xs"
        position="right"
      >
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              navigate("/");
              setDrawerOpened(false);
            }}
            className="text-sm text-blue-800 flex items-center gap-2"
          >
            <img
              src="/images/script-assist.png"
              alt="Script Assist"
              width={100}
              onClick={() => navigate("/")}
            />
          </button>
          <button
            onClick={handleSignOut}
            className="text-sm text-blue-800 flex items-center gap-2"
          >
            <PiSignOutLight className="text-xl" />
            Sign Out
          </button>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
