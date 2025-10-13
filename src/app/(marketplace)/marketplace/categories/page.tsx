import { Heart, LayoutGrid, List, Star } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <main id="main-content" className="flex-1">
      <div id="marketplace-header" className="border-b p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-white">Categories</h1>
        </div>
      </div>

      <div id="products-grid" className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="product-card max-h-64 cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
            <div className="relative">
              <img
                className="h-48 w-full object-cover"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/fbe3868016-04e79c6019ff7796ca7b.png"
                alt="ancient indian manuscript with sanskrit text, spiritual book, traditional binding"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-2 font-semibold text-gray-900">Ancient Vedic Manuscripts</h3>
            </div>
          </div>

          <div className="product-card cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
            <div className="relative">
              <img
                className="h-48 w-full object-cover"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/dcf391479c-d198b41a20d509b1ae0a.png"
                alt="handcrafted indian pottery, terracotta vase, traditional clay art"
              />
              <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md hover:bg-red-50">
                <i className="text-gray-600 hover:text-red-500" data-fa-i2svg="">
                  <svg
                    className="svg-inline--fa fa-heart"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="heart"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                    ></path>
                  </svg>
                </i>
              </button>
            </div>
            <div className="p-4">
              <h3 className="mb-2 font-semibold text-gray-900">Handcrafted Pottery Set</h3>
              <p className="mb-3 text-sm text-gray-600">Traditional terracotta collection</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">₹1,200</span>
                <div className="flex items-center space-x-1">
                  <i className="text-xs text-yellow-400" data-fa-i2svg="">
                    <svg
                      className="svg-inline--fa fa-star"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="star"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                      ></path>
                    </svg>
                  </i>
                  <span className="text-sm text-gray-600">4.6</span>
                </div>
              </div>
            </div>
          </div>

          <div className="product-card cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
            <div className="relative">
              <img
                className="h-48 w-full object-cover"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/470c158643-0d22a8108491c93b4516.png"
                alt="traditional indian tabla drums, musical instruments, wooden tabla set"
              />
              <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md hover:bg-red-50">
                <i className="text-gray-600 hover:text-red-500" data-fa-i2svg="">
                  <svg
                    className="svg-inline--fa fa-heart"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="heart"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                    ></path>
                  </svg>
                </i>
              </button>
            </div>
            <div className="p-4">
              <h3 className="mb-2 font-semibold text-gray-900">Professional Tabla Set</h3>
              <p className="mb-3 text-sm text-gray-600">Handmade wooden tabla drums</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">₹8,500</span>
                <div className="flex items-center space-x-1">
                  <i className="text-xs text-yellow-400" data-fa-i2svg="">
                    <svg
                      className="svg-inline--fa fa-star"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="star"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                      ></path>
                    </svg>
                  </i>
                  <span className="text-sm text-gray-600">4.9</span>
                </div>
              </div>
            </div>
          </div>

          <div className="product-card cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
            <div className="relative">
              <img
                className="h-48 w-full object-cover"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a0f291a191-d411acaa83da4d4e30ac.png"
                alt="traditional indian jewelry, gold necklace, temple jewelry design"
              />
              <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md hover:bg-red-50">
                <i className="text-gray-600 hover:text-red-500" data-fa-i2svg="">
                  <svg
                    className="svg-inline--fa fa-heart"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="heart"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                    ></path>
                  </svg>
                </i>
              </button>
            </div>
            <div className="p-4">
              <h3 className="mb-2 font-semibold text-gray-900">Temple Jewelry Set</h3>
              <p className="mb-3 text-sm text-gray-600">Traditional gold-plated necklace</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">₹15,000</span>
                <div className="flex items-center space-x-1">
                  <i className="text-xs text-yellow-400" data-fa-i2svg="">
                    <svg
                      className="svg-inline--fa fa-star"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="star"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                      ></path>
                    </svg>
                  </i>
                  <span className="text-sm text-gray-600">4.7</span>
                </div>
              </div>
            </div>
          </div>

          <div className="product-card cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
            <div className="relative">
              <img
                className="h-48 w-full object-cover"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/66658b26ad-5dbc6098e77b3cdcf4af.png"
                alt="traditional indian silk saree, colorful fabric, ethnic clothing"
              />
              <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md hover:bg-red-50">
                <i className="text-gray-600 hover:text-red-500" data-fa-i2svg="">
                  <svg
                    className="svg-inline--fa fa-heart"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="heart"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                    ></path>
                  </svg>
                </i>
              </button>
            </div>
            <div className="p-4">
              <h3 className="mb-2 font-semibold text-gray-900">Silk Saree Collection</h3>
              <p className="mb-3 text-sm text-gray-600">Pure silk traditional wear</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">₹12,000</span>
                <div className="flex items-center space-x-1">
                  <i className="text-xs text-yellow-400" data-fa-i2svg="">
                    <svg
                      className="svg-inline--fa fa-star"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="star"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                      ></path>
                    </svg>
                  </i>
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
            </div>
          </div>

          <div className="product-card cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
            <div className="relative">
              <img
                className="h-48 w-full object-cover"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c67274a096-0a6e0652ce81267123b4.png"
                alt="traditional indian painting, madhubani art, colorful folk art"
              />
              <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md hover:bg-red-50">
                <i className="text-gray-600 hover:text-red-500" data-fa-i2svg="">
                  <svg
                    className="svg-inline--fa fa-heart"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="heart"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                    ></path>
                  </svg>
                </i>
              </button>
            </div>
            <div className="p-4">
              <h3 className="mb-2 font-semibold text-gray-900">Madhubani Painting</h3>
              <p className="mb-3 text-sm text-gray-600">Authentic folk art from Bihar</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">₹3,500</span>
                <div className="flex items-center space-x-1">
                  <i className="text-xs text-yellow-400" data-fa-i2svg="">
                    <svg
                      className="svg-inline--fa fa-star"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="star"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                      ></path>
                    </svg>
                  </i>
                  <span className="text-sm text-gray-600">4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
