"use client";

import { useEffect, useRef, useState } from "react";

import Input from "../Input";
import { Category } from "@prisma/client";

const useDebounce = (value: any, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timeout = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

const CategorySelect = ({
  category,
  onChange,
}: {
  onChange: (category: Category) => void;
  category: Category | null;
}) => {
  const suppressDialog = useRef(false);
  const [term, setTerm] = useState<string>(() => {
    if (category && category.name) {
      suppressDialog.current = true;
      return category.name;
    }
    return "";
  });

  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Category[]>([]);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (category && term !== category.name) {
      suppressDialog.current = true;
      setTerm(category.name);
    }
  }, [category]);
  const debouncedTerm = useDebounce(term);

  useEffect(() => {
    if (suppressDialog.current) {
      suppressDialog.current = false;
      return;
    }
    setLoading(true);
    const loadCategories = async (term: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories` +
            (term ? `?term=${term}` : "")
        );
        const json = await response.json();
        setResults(json.categories);
      } catch (error) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    loadCategories(debouncedTerm);
  }, [debouncedTerm]);

  const onChangeCategory = (category: Category) => {
    onChange(category);
    setTerm(category.name);
    setActive(false);
    suppressDialog.current = true;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      console.log(!dialogRef.current?.contains(e.target as Node));
      if (
        dialogRef.current &&
        !dialogRef.current?.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative">
      <Input
        value={term}
        ref={inputRef}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Select a category"
        onFocus={() => setActive(true)}
      />
      {active && (
        <div
          ref={dialogRef}
          role="dialog"
          className="w-full overflow-hidden absolute z-10 top-16 left-0 max-h-20 bg-white rounded-md shadow"
        >
          {!!results.length && !loading && (
            <ul>
              {results.map((category) => (
                <li
                  key={category.id}
                  className="py-3 px-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => onChangeCategory(category)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
          {loading && <p className="py-3 px-2">Loading...</p>}
          {!loading && error && <p className="py-3 px-2">{error}</p>}
          {!results.length && !loading && (
            <p className="py-3 px-2">No results found</p>
          )}
        </div>
      )}
      {}
    </div>
  );
};

export default CategorySelect;
