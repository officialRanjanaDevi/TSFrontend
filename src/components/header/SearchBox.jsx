"use client";
import React, { useEffect, useState, useRef } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [popularSearches, setPopularSearches] = useState([
    "shirt",
    "jeans",
    "smartwatch",
    "ipad",
    "samsung",
    "iphone",
  ]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1); // Track selected result index
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const router = useRouter();
  const suggestionRef = useRef();

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setShowSuggestions(false);
  };

  const handleSearchBarClick = () => {
    if (searchText === "") {
      setShowSuggestions(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (
        selectedResultIndex >= 0 &&
        selectedResultIndex < searchResults.length
      ) {
        handleResultClick(
          searchResults[selectedResultIndex]._id,
          searchResults[selectedResultIndex].name
        );
      } else if (searchResults.length > 0) {
        handleResultClick(searchResults[0]._id, searchResults[0].name);
      }
    } else if (e.key === "ArrowUp") {
      setSelectedResultIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "ArrowDown") {
      setSelectedResultIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchResults.length - 1)
      );
    }
  };

  useEffect(() => {
    const searchtext = searchText.trim();
    if (searchtext !== "") {
      axios
        .get(`${serverURL}/api/v1/search?q=${searchtext}`)
        .then((res) => {
          console.log(res.data.uniqueCategories); // Add this line to check the structure of res.data.uniqueCategories
          setSearchResults(res.data.uniqueCategories.slice(0, 10));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchText, serverURL]);

  const handleClearInput = () => {
    setSearchText("");
    setShowSuggestions(false);
  };

  const handleResultClick = (categoryId, categoryName) => {
    setShowSuggestions(false);
    setSearchResults([]);
    router.push(`/subcategory/${categoryId}`);
  };

  const handlePopularSearchClick = (searchTerm) => {
    setSearchText(searchTerm);
    setShowSuggestions(false);
  };

  const handleCategoryClick = (categoryId) => {
    setShowSuggestions(false);
    setSearchResults([]);
    router.push(`/subcategory/${categoryId}`);
  };
  useEffect(() => {
    // Close suggestion box and search results when clicking outside
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-row items-center justify-center order-4 lg:order-2 w-full">
      <div className="relative rounded flex items-center justify-between w-full font-poppins pl-4 pr-2 py-1 border border-gray-200 lg:w-[400px]">
        <input
          value={searchText}
          onChange={handleInputChange}
          onFocus={handleSearchBarClick}
          onKeyDown={handleKeyDown} // Add keydown event listener
          placeholder="Search here...."
          className="w-full focus:outline-none"
          required
        />
        <div
          onClick={handleClearInput}
          className="rounded flex p-2 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] cursor-pointer"
        >
          {searchText.trim() === "" ? (
            <IoSearch size={24} />
          ) : (
            <IoClose size={24} />
          )}
        </div>
        {showSuggestions && (
          <div
            ref={suggestionRef}
            className="right-0.5 bg-white w-full p-4 flex items-start justify-center flex-col z-[100] absolute top-12"
          >
            {popularSearches.map((searchTerm, index) => (
              <div
                key={index}
                className="cursor-pointer border-b w-full py-2 flex items-center"
                onClick={() => handlePopularSearchClick(searchTerm)}
              >
                <IoSearch size={24} />
                <span className="ml-2">{searchTerm}</span>
              </div>
            ))}
            {uniqueCategories.map((category, index) => (
              <div
                key={index}
                className="cursor-pointer border-b w-full py-2 flex items-center"
                onClick={() => handleCategoryClick(category._id)}
              >
                <IoSearch size={24} />
                <span className="ml-2" style={{ color: "#FAAC06" }}>
                  in {category.name}
                </span>
              </div>
            ))}
          </div>
        )}
        {searchResults.length > 0 && searchText.trim() !== "" && (
          <div className="right-0.5 bg-white w-full p-4 flex items-start justify-center flex-col z-[100] absolute top-12 ">
            {searchResults.map((result, index) => {
              return (
                <div
                  key={index}
                  className={`cursor-pointer border-b w-full py-2 flex items-center ${
                    selectedResultIndex === index ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleResultClick(result._id, result.name)}
                >
                  <div className="w-12 h-12 mr-2 overflow-hidden rounded">
                    <img
                      src={result.image.url}
                      alt={result.name}
                      width={40}
                      height={40}
                      layout="responsive"
                    />
                  </div>
                  <div>
                    <span>{searchText}</span>
                    <div style={{ color: "#FAAC06" }}>in {result.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
