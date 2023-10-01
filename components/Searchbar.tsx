"use client";
import React, { FormEvent, useState } from "react";

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  function isValidAmazonProductURL(url: string) {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchPrompt);
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
      <button type="submit" className="searchbar-btn">
        Search
      </button>
    </form>
  );
};

export default Searchbar;
