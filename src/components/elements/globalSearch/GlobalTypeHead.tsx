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

  useEffect(() => {
    fetchAllOptions();
  }, []);

  // Fetch all options on component mount
  const fetchAllOptions = async () => {
    setIsLoading(true);

    setIsLoading(false);
  };

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };
  // Handle search input
  const handleSearch = async (query: string) => {
    setOptions([]);
    setIsLoading(true);

    try {
      // Return early if query is empty

      // Fetch search results
      // console.log("searchResults", searchResults);
      // Handle errors
      const newOptions = [];

      // Update options in a single state update
      // setOptions(newOptions);
    } catch (err) {
      console.error("Error during search:", err);
    } finally {
      // Ensure loading state is updated
      setIsLoading(false);
    }
  };

  const debouncedHandleSearch = React.useMemo(() => debounce(handleSearch, 500), []);
  // Update the search terms when an option is selected
  const handleChange = (selected: any) => {
  };

  // Handle clearing a previous search term
  const handleClearSearchTerm = (term: any) => {
    // removeSearchTerm(term);
  };

  const handleMenuItemClick = (result: any) => {
  };

  return (
    <div>
      <AsyncTypeahead
        id="global-typeahead"
        
        onFocus={() => {
          setOptions([]);
          fetchAllOptions();
        }}
        onSearch={debouncedHandleSearch}
        onChange={handleChange}
        options={options}
        labelKey="name"
        isLoading={isLoading}
        minLength={0}
        placeholder="Search anything..."
        inputProps={{ className: "border-none rounded-lg p-1 pl-3 !w-full" }}
        useCache={true}
        // renderMenu={(results, menuProps) => (
        //   <Menu {...menuProps}>
        //     <div className="max-h-60 overflow-y-auto">
        //       {isLoading && <p className="p-0.5 text-sm">Loading...</p>}
        //       {!!searchTerms.length && (
        //         <p className="flex justify-between p-1 pb-0 text-xs text-gray-500">
        //           <span>Recent Searches</span>
        //           <span
        //             className="cursor-pointer text-bg1 hover:text-red-500"
        //             onClick={removeAllSearchTerm}
        //           >
        //             Clear all
        //           </span>
        //         </p>
        //       )}
        //       {searchTerms.map((term, index) => (
        //         <div key={index} className="relative">
        //           <div onClick={() => handleMenuItemClick(term)}>
        //             <Card
        //               avatar={term.avatar}
        //               name={term.name}
        //               location={term.location}
        //               type={term.type}
        //             />
        //           </div>
        //           <button
        //             onClick={() => handleClearSearchTerm(term)}
        //             className="absolute right-1 top-1 cursor-pointer text-bg1 hover:text-red-500"
        //           >
        //             <AiOutlineCloseCircle />
        //           </button>
        //         </div>
        //       ))}
        //       <hr className="border-t border-gray-300" />
        //       <p className="p-1 pb-0 text-xs text-gray-500">Results</p>
        //       {results.map((result: any, index) => (
        //         <MenuItem
        //           key={index}
        //           option={result}
        //           position={index}
        //           onClick={() => handleMenuItemClick(result)}
        //         >
        //           <Card
        //             avatar={result.avatar}
        //             name={result.name}
        //             location={result.location}
        //             type={result.type}
        //           />
        //         </MenuItem>
        //       ))}
        //     </div>
        //   </Menu>
        // )}
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
        />
      ) : (
        <FcSearch className="col-span-2 w-full cursor-pointer text-2xl" />
      )}
      <div className="col-span-10 cursor-pointer capitalize">
        <p className="cursor-pointer truncate">{name}</p>
        <p className="cursor-pointer text-sm text-gray-400">
          {type === "category" ? "Category" : location ? location : "Location"}
        </p>
      </div>
    </div>
  );
}
