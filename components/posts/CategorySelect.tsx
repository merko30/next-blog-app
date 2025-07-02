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

const CategorySelect = ({
  category,
  onChange,
}: {
  onChange: (category: Category) => void;
  category: Category | null;
}) => {
  const [term, setTerm] = useState<string>(category ? category.name : "");
  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Category[]>([]);

  const debouncedTerm = useDebounce(term);

  useEffect(() => {
    const loadCategories = async (term: string) => {
      setLoading(true);
      setActive(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories?term=${term}`
        );
        const json = await response.json();
        setResults(json.categories);
      } catch (error) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    if (debouncedTerm !== category?.name) {
      loadCategories(debouncedTerm);
    } else {
      setResults([]);
    }

    loadCategories(debouncedTerm);
  }, [debouncedTerm]);

  return (
    <div className="relative">
      <Input value={term} onChange={(e) => setTerm(e.target.value)} />
      {active && debouncedTerm.length > 3 && (
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
                  onClick={() => {
                    onChange(category);
                  }}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
          {loading && <p>Loading...</p>}
          {!results.length && <p>No results found</p>}
        </div>
      )}
      {}
    </div>
  );
};

export default CategorySelect;
