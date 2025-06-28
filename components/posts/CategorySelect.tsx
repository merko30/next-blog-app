"use client";

import { useEffect, useState } from "react";

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

const CategorySelect = () => {
  const [term, setTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Category[]>([]);

  const debouncedTerm = useDebounce(term);

  useEffect(() => {
    const loadCategories = async (term: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories?term=${term}`
        );
        console.log(response);
        const json = await response.json();
        console.log(json);

        setResults(json.categories);
      } catch (error) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    if (debouncedTerm.length > 2) {
      loadCategories(debouncedTerm);
    } else {
      setResults([]);
    }

    loadCategories(debouncedTerm);
  }, [debouncedTerm]);

  return (
    <div className="relative">
      <Input value={term} onChange={(e) => setTerm(e.target.value)} />
      {debouncedTerm.length > 3 && (
        <div
          role="dialog"
          className="w-full absolute z-10 top-16 left-0 max-h-20 bg-white rounded-md shadow"
        >
          {!!results.length && (
            <ul>
              {results.map((category) => (
                <li
                  key={category.id}
                  className="py-3 px-2 hover:bg-gray-50 cursor-pointer"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
          {loading && <p>Loading...</p>}
        </div>
      )}
      {}
    </div>
  );
};

export default CategorySelect;
