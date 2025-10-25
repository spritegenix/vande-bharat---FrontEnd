"use client";
import React, { useEffect, useState } from "react";
import { AsyncTypeahead, Menu, MenuItem } from "react-bootstrap-typeahead";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcSearch } from "react-icons/fc";

export default function GlobalTypeHead() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [options, setOptions] = useState<any>([]);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = async (query: string) => {
    setOptions([]);
    setIsLoading(true);

    try {
      if (!query) {
        setOptions([]);
        setIsLoading(false); // Ensure loading is false if query is empty
        return;
      }

      // Using the provided environment variable for the base URL
      const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${BASE_URL}/search?query=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const searchResults = await response.json();

      const newOptions: any[] = [];

      searchResults.users.forEach((user: any) => {
        newOptions.push({
          id: user._id,
          name: user.name || user.username, // Corrected to use user.name first
          avatar: user.avatar,
          type: "user",
          slug: user.slug,
          location: user.city || user.country || "", // Add location for users if available
        });
      });

      searchResults.communities.forEach((community: any) => {
        newOptions.push({
          id: community._id,
          name: community.name,
          avatar: community.banner,
          type: "community",
          slug: community.slug,
          location: community.location || "", // Add location for communities if available
        });
      });

      searchResults.products.forEach((product: any) => {
        newOptions.push({
          id: product._id,
          name: product.title,
          avatar: product.images && product.images.length > 0 ? product.images[0] : "",
          type: "product",
          slug: product.slug,
          location: product.location || "", // Add location for products if available
        });
      });

      setOptions(newOptions);
    } catch (err) {
      console.error("Error during search:", err);
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedHandleSearch = React.useMemo(() => debounce(handleSearch, 500), []);

  const handleChange = (selected: any) => {
    if (selected.length > 0) {
      const result = selected[0];
      handleMenuItemClick(result);
    }
  };

  const handleMenuItemClick = (result: any) => {
    if (result.type === "user") {
      router.push(`/profile/${result.slug}`);
    } else if (result.type === "community") {
      router.push(`/community/${result.slug}`);
    } else if (result.type === "product") {
      router.push(`/marketplace/products/${result.slug}`);
    }
  };

  return (
    <div className="relative w-full">
      <AsyncTypeahead
        id="global-typeahead"
        onSearch={debouncedHandleSearch}
        onChange={handleChange}
        options={options}
        labelKey="name"
        isLoading={isLoading}
        minLength={1}
        placeholder="Search anything..."
        inputProps={{
          className: "border-none rounded-lg p-1 pl-3 !w-full bg-zinc-50 dark:bg-zinc-800",
        }}
        useCache={false}
        renderMenu={(results, menuProps) => (
          <Menu
            {...menuProps}
            className="absolute mt-5 w-full rounded-md border shadow-lg"
            style={{ backgroundColor: "white", zIndex: 1000, top: "100%" }}
          >
            <div className="max-h-60 overflow-y-auto dark:bg-zinc-800">
              {isLoading && <p className="p-0.5 text-sm">Loading...</p>}
              {results.length === 0 && !isLoading && (
                <p className="p-0.5 text-sm text-gray-500">No results found.</p>
              )}
              {results.map((result: any, index) => (
                <MenuItem
                  key={index}
                  option={result}
                  position={index}
                  onClick={() => handleMenuItemClick(result)}
                  className="hover:bg-gray-100 dark:hover:bg-zinc-700"
                  style={{ backgroundColor: "white" }}
                >
                  <Card
                    avatar={result.avatar}
                    name={result.name}
                    location={result.location}
                    type={result.type}
                  />
                </MenuItem>
              ))}
            </div>
          </Menu>
        )}
      />
    </div>
  );
}

function Card({
  avatar,
  name,
  location,
  type,
}: {
  avatar: string;
  name: string;
  location?: string;
  type: string;
}) {
  return (
    <div className="grid cursor-pointer grid-cols-12 items-center gap-2 px-1 py-1 hover:bg-gray-100">
      {avatar ? (
        <Image
          src={avatar}
          alt="avatar"
          width={40}
          height={40}
          className="col-span-2 h-10 w-full cursor-pointer rounded-md object-cover"
          style={{ width: "50px", height: "50px", objectFit: "cover" }} // Added inline styles to resolve Next.js Image warnings
        />
      ) : (
        <FcSearch className="col-span-2 w-full cursor-pointer text-2xl" />
      )}
      <div className="col-span-10 cursor-pointer capitalize">
        <p className="cursor-pointer truncate">{name}</p>
        {location && (
          <p className="cursor-pointer text-sm text-gray-400">
            {type === "category" ? "Category" : location}
          </p>
        )}
      </div>
    </div>
  );
}
