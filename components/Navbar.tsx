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

const items: Array<NavItem> = [
  {
    label: "Điểm danh",
    page: "/rollcall",
  },
  {
    label: "Bài giảng",
    page: "/lecture",
  },
];

export default function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const pathname = usePathname();

  return (
    <header className="w-full flex px-4 min-h-[72px] shadow bg-white dark:bg-stone-900 dark:border-b dark:border-stone-600">
      <div className="flex justify-between w-full m-auto">
        <div className="flex items-center justify-between">
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
        <div className="flex items-center justify-center space-x-5">
          {items.map((item, idx) => {
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
    </header>
  );
}
