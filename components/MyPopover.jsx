"use client";

import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export function MyPopover({ title, children }) {
  return (
    <Popover className="relative">
      <Popover.Button
        className={
          "flex items-center rounded-md border-black px-3 py-2 text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        }
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={
            "ml-2 h-5 w-5 text-grey-300 transition duration-150 ease-in-out group-hover:text-opacity-80"
          }
          aria-hidden="true"
        />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 bg-white rounded-lg shadow-md p-4">
        {children}
      </Popover.Panel>
    </Popover>
  );
}
