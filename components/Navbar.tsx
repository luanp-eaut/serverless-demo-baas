"use client";

import React from "react";
import { useTheme } from "next-themes";
import { RiMoonFill, RiSunLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  page: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Điểm danh",
    page: "/rollcall",
  },
  {
    label: "Bài giảng",
    page: "/lecture",
  },
  {
    label: "Sinh viên",
    page: "/students",
  },
];

export default function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const pathname = usePathname();

  return (
    <header className="w-full mx-auto  px-4 sm:px-20 fixed top-0 z-50 shadow bg-white dark:bg-stone-900 dark:border-b dark:border-stone-600">
      <div className="justify-between md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <div className="container flex items-center space-x-2">
                <img
                  src="eaut-logo.png"
                  alt="Trường Đại học Công nghệ Đông As"
                  className="h-[45px]"
                />
                <div className="flex flex-col items-center font-bold">
                  <h3 className="uppercase">Khoa CNTT</h3>
                  <h2 className="font-bold">Lớp 12.10.2</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {NAV_ITEMS.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  href={item.page}
                  className={`block lg:inline-block text-neutral-900  hover:text-neutral-500 dark:text-neutral-100 cursor-pointer ${
                    pathname === item.page ? "text-blue-700 font-bold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {currentTheme === "dark" ? (
              <button
                onClick={() => setTheme("light")}
                className="bg-slate-100 p-2 rounded-xl"
              >
                <RiSunLine size={25} color="black" />
              </button>
            ) : (
              <button
                onClick={() => setTheme("dark")}
                className="bg-slate-100 p-2 rounded-xl"
              >
                <RiMoonFill size={25} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
