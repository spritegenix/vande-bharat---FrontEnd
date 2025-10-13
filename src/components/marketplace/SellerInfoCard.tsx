"use client";
import React from "react";

export default function SellerInfoCard() {
  return (
    <div className="mt-8 rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold dark:text-white">Seller Information</h3>
      <div className="flex items-center space-x-4">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cfce54f6?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Seller Avatar"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-medium dark:text-white">John Doe</p>
          <p className="text-sm text-neutral-500">View other listings</p>
        </div>
      </div>
    </div>
  );
}
