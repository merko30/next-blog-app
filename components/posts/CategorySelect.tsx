"use client";

import { Ref, RefObject, useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    if (category && term !== category.name) {
      suppressDialog.current = true;
      setTerm(category.name);
    } else if (!category && term !== "") {
      suppressDialog.current = true;
      setTerm("");
    }
  }, [category]);
  const debouncedTerm = useDebounce(term);

  useEffect(() => {
    if (suppressDialog.current) {
      suppressDialog.current = false;
      return;
    }
    const loadCategories = async (term: string) => {
      setLoading(true);
      setActive(true);
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
    suppressDialog.current = true;
    setTerm(category.name);
    setActive(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative">
      <Input value={term} onChange={(e) => setTerm(e.target.value)} />
      {active && debouncedTerm.length > 3 && (
        <div
          ref={dialogRef}
          role="dialog"
          className="w-full absolute z-10 top-16 left-0 max-h-20 bg-white rounded-md shadow"
        >
          {!!results.length && (
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
