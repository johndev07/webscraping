"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [loading, setloading] = useState(false);
  function isValidAmazonProductURL(url: string) {
    const parsedURL = new URL(url);
    const hostname = parsedURL.host;
    console.log(parsedURL.host);
    try {
      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon.") ||
        hostname.endsWith("amazon")
      ) {
        return true;
      }
    } catch (error) {}
    return false;
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchPrompt);
    if (!isValidLink) {
      alert("please provide a valid amazon link");
    }
    try {
      setloading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter product link"
        value={searchPrompt}
        onChange={(e) => {
          setSearchPrompt(e.target.value);
        }}
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {loading ? "Searching...." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
