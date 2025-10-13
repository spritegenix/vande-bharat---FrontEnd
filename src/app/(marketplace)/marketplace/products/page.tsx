"use client";
import { useGetMarketplaceItems } from "@/queries/marketplace/queries";
import { useAddItemToWishlist } from "@/queries/wishlist/mutations";
import { Heart, LayoutGrid, List, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  const { data: marketplaceItems, isLoading } = useGetMarketplaceItems();
  const { mutate: addItemToWishlist } = useAddItemToWishlist();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div id="main-container" className="flex">
      {/* <aside
        id="sidebar"
        className="sticky top-16 h-screen w-64 border-r border-gray-200 bg-white shadow-sm"
      >
        <div className="p-6">
          <button
            id="add-product-btn"
            className="bg-primary mb-6 w-full rounded-lg px-4 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
          >
            <i className="mr-2" data-fa-i2svg="">
              <svg
                className="svg-inline--fa fa-plus"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="plus"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                ></path>
              </svg>
            </i>
            Add Product
          </button>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <span className="hover:text-primary hover:bg-primary/10 flex cursor-pointer items-center rounded-lg px-3 py-2 text-gray-600">
                    <i className="mr-3" data-fa-i2svg="">
                      <svg
                        className="svg-inline--fa fa-book"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="book"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                        ></path>
                      </svg>
                    </i>
                    Books & Scriptures
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary hover:bg-primary/10 flex cursor-pointer items-center rounded-lg px-3 py-2 text-gray-600">
                    <i className="mr-3" data-fa-i2svg="">
                      <svg
                        className="svg-inline--fa fa-palette"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="palette"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                        ></path>
                      </svg>
                    </i>
                    Art & Crafts
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary hover:bg-primary/10 flex cursor-pointer items-center rounded-lg px-3 py-2 text-gray-600">
                    <i className="mr-3" data-fa-i2svg="">
                      <svg
                        className="svg-inline--fa fa-music"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="music"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"
                        ></path>
                      </svg>
                    </i>
                    Music & Instruments
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary hover:bg-primary/10 flex cursor-pointer items-center rounded-lg px-3 py-2 text-gray-600">
                    <i className="mr-3" data-fa-i2svg="">
                      <svg
                        className="svg-inline--fa fa-gem"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="gem"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M116.7 33.8c4.5-6.1 11.7-9.8 19.3-9.8H376c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4l-232 256c-4.5 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152zm38.5 39.8c-3.3 2.5-4.2 7-2.1 10.5l57.4 95.6L63.3 192c-4.1 .3-7.3 3.8-7.3 8s3.2 7.6 7.3 8l192 16c.4 0 .9 0 1.3 0l192-16c4.1-.3 7.3-3.8 7.3-8s-3.2-7.6-7.3-8L301.5 179.8l57.4-95.6c2.1-3.5 1.2-8.1-2.1-10.5s-7.9-2-10.7 1L256 172.2 165.9 74.6c-2.8-3-7.4-3.4-10.7-1z"
                        ></path>
                      </svg>
                    </i>
                    Jewelry & Accessories
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary hover:bg-primary/10 flex cursor-pointer items-center rounded-lg px-3 py-2 text-gray-600">
                    <i className="mr-3" data-fa-i2svg="">
                      <svg
                        className="svg-inline--fa fa-shirt"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="shirt"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"
                        ></path>
                      </svg>
                    </i>
                    Traditional Clothing
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">
                My Activity
              </h3>
              <ul className="space-y-2">
                <li>
                  <span className="hover:text-primary hover:bg-primary/10 flex cursor-pointer items-center rounded-lg px-3 py-2 text-gray-600">
                    <i className="mr-3" data-fa-i2svg="">
                      <svg
                        className="svg-inline--fa fa-bag-shopping"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="bag-shopping"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                        ></path>
                      </svg>
                    </i>
                    My Products
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary hover:bg-primary/10 flex cursor-pointer items-center rounded-lg px-3 py-2 text-gray-600">
                    <i className="mr-3" data-fa-i2svg="">
                      <svg
                        className="svg-inline--fa fa-heart"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="heart"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                        ></path>
                      </svg>
                    </i>
                    Wishlist
                  </span>
                </li>
                <li>
                  <span className="hover:text-primary hover:bg-primary/10 flex cursor-pointer items-center rounded-lg px-3 py-2 text-gray-600">
                    <i className="mr-3" data-fa-i2svg="">
                      <svg
                        className="svg-inline--fa fa-clock"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="clock"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                        ></path>
                      </svg>
                    </i>
                    Order History
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">
                Suggestions
              </h3>
              <div className="space-y-3">
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="mb-2 text-xs text-gray-700">Trending in Art & Crafts</p>
                  <p className="text-sm font-medium text-gray-900">Handmade Pottery</p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-3">
                  <p className="mb-2 text-xs text-gray-700">Popular this week</p>
                  <p className="text-sm font-medium text-gray-900">Spiritual Books</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside> */}

      <main id="main-content" className="flex-1">
        <div id="marketplace-header" className="border-b p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold dark:text-white">Marketplace</h1>
            {/* <div className="flex items-center space-x-4">
              <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
              <div className="flex overflow-hidden rounded-lg border border-gray-300">
                <button className="bg-primary p-2 text-white">
                  <LayoutGrid />
                </button>
                <button className="p-2 dark:hover:bg-gray-600">
                  <List />
                </button>
              </div>
            </div> */}
          </div>
          {/* <div className="flex space-x-4">
            <span className="rounded-full bg-primary px-3 py-1 text-sm text-white">
              All Products
            </span>
            <span className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-primary hover:text-white">
              Featured
            </span>
            <span className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-primary hover:text-white">
              New Arrivals
            </span>
            <span className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-primary hover:text-white">
              Best Sellers
            </span>
          </div> */}
        </div>

        <div id="products-grid" className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {marketplaceItems?.map((item: any) => (
              <Link href={`/marketplace/products/${item.slug}`} key={item._id}>
                <div className="product-card cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
                  <div className="relative">
                    <img
                      className="h-48 w-full object-cover"
                      src={item.attachments[0]}
                      alt={item.title}
                    />
                    <button
                      className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md hover:bg-red-50"
                      onClick={(e) => {
                        e.preventDefault();
                        addItemToWishlist(item._id);
                      }}
                    >
                      <Heart className="h-5 w-5 hover:fill-red-500 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                    <p className="mb-3 text-sm text-gray-600">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {item.currency}
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
