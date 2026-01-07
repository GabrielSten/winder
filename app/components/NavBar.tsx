"use client";
import { places } from "@/app/conf";
import Link from "next/link";
import { parseSwe } from "@/app/utils";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const active = pathname?.split("/").at(-1) || "";

  function setActiveColor(placeName: string): string {
    if (active === placeName) {
      return "text-active";
    }

    return "text-inactive";
  }

  return (
    <div className="sticky top-0 flex w-full flex-col bg-banner scroll-auto z-10">
      <div className="flex items-center justify-between p-4 pl-1 min-w-90">
        <ul className="font-medium flex flex-row space-x-4">
          {places.map(({ name }, index) => {
            return (
              <div key={index + "_menu_item"}>
                <li>
                  <Link
                    href={parseSwe(name)}
                    className={`transition-all py-2 pl-4 pr-4 hover:text-active ${setActiveColor(
                      parseSwe(name),
                    )}`}
                    aria-current="page"
                  >
                    {name}
                  </Link>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
