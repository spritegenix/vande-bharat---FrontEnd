import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { IoFilter, IoLocationOutline } from "react-icons/io5";
import LocationTypeHead from "./globalSearch/LocationTypeHead";
import Dropdown, { DropdownItem } from "./Dropdown";
import Button from "./Button";
import { FilterProps } from "@/app/services/[service]/_sections/types";
import { useLocationStore } from "@/zustandStore/location";
import { FaArrowUpLong } from "react-icons/fa6";

export default function Filters({
  filtersApplied,
  setFiltersApplied,
}: {
  filtersApplied: FilterProps;
  setFiltersApplied: React.Dispatch<React.SetStateAction<FilterProps>>;
}) {
  return (
    <div className="grid grid-cols-[repeat(22,minmax(0,1fr))] gap-2 border-b border-zinc-400">
      {/* 1 st  */}
      <div className="col-[_span_20_/_span_20]">
        <Navbar>
          <FiltersList filtersApplied={filtersApplied} setFiltersApplied={setFiltersApplied} />
        </Navbar>
      </div>
      {/* 2 nd  */}
      <div className="col-span-2 flex items-center justify-end">
        <Button leftIcon={<IoFilter className="text-lg text-white" />} variant="orange">
          <p className="max-md:hidden">Filters</p>
        </Button>
      </div>
    </div>
  );
}

export function FiltersList({
  filtersApplied,
  setFiltersApplied,
}: {
  filtersApplied: FilterProps;
  setFiltersApplied: React.Dispatch<React.SetStateAction<FilterProps>>;
}) {
  const { location } = useLocationStore();
  const [pageLocation, setPageLocation] = useState<string | undefined>("");

  useEffect(() => {
    setPageLocation(location?.selectedLocation);
  }, [location]);
  return (
    <>
      {/* Location */}
      {pageLocation && (
        <div className="flex items-center space-x-2">
          <IoLocationOutline className="text-lg max-md:text-white" />
          <p className="max-md:text-white">{pageLocation}</p>
        </div>
      )}
      {/* Sort by  */}
      <Dropdown text="Sort by" isRelative={false}>
        <DropdownItem
          onClick={() => setFiltersApplied((pre) => ({ ...pre, sortBy: "alphabetical" }))}
        >
          Alphabetically
        </DropdownItem>
        <DropdownItem onClick={() => setFiltersApplied((pre) => ({ ...pre, sortBy: "rating" }))}>
          By Rating
        </DropdownItem>
      </Dropdown>
      {/* Ratings */}
      <Dropdown text="Ratings" isRelative={false}>
        <DropdownItem onClick={() => setFiltersApplied((pre) => ({ ...pre, rating: 3.5 }))}>
          3.5+
        </DropdownItem>
        <DropdownItem onClick={() => setFiltersApplied((pre) => ({ ...pre, rating: 3 }))}>
          3
        </DropdownItem>
        <DropdownItem onClick={() => setFiltersApplied((pre) => ({ ...pre, rating: 4.5 }))}>
          4.5+
        </DropdownItem>
        <DropdownItem onClick={() => setFiltersApplied((pre) => ({ ...pre, rating: 4 }))}>
          4
        </DropdownItem>
        <DropdownItem onClick={() => setFiltersApplied((pre) => ({ ...pre, rating: 5 }))}>
          5
        </DropdownItem>
      </Dropdown>
      {/* Verified  */}
      <Button
        variant={filtersApplied?.verify ? "orange" : "white"}
        onClick={() => setFiltersApplied((pre) => ({ ...pre, verify: !pre.verify }))}
      >
        Verified Businesses
      </Button>
      {/* Most Experienced */}
      <Button
        variant={filtersApplied.sortBy === "experience" ? "orange" : "white"}
        onClick={() =>
          setFiltersApplied((pre) => ({
            ...pre,
            sortBy: pre.sortBy === "experience" ? "alphabetical" : "experience",
          }))
        }
      >
        Most Experienced
      </Button>
      {/* Order */}
      <Button
        variant="white"
        rightIcon={
          <FaArrowUpLong
            className={`text-lg transition-all duration-300 ${filtersApplied.order === "desc" ? "rotate-180" : ""}`}
          />
        }
        onClick={() =>
          setFiltersApplied((pre) => ({
            ...pre,
            order: pre.order === "desc" ? "asc" : "desc",
          }))
        }
      >
        Order By
      </Button>
    </>
  );
}
