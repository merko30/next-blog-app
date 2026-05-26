"use client";
import Link from "next/link";
import {
  BookmarkSimpleIcon,
  CodeIcon,
  PaletteIcon,
  RocketIcon,
  LightbulbIcon,
  HeartIcon,
  StarIcon,
  CoffeeIcon,
  MusicNoteIcon,
} from "@phosphor-icons/react";

interface Category {
  id: string;
  name: string;
}

const ICONS = [
  BookmarkSimpleIcon,
  CodeIcon,
  PaletteIcon,
  RocketIcon,
  LightbulbIcon,
  HeartIcon,
  StarIcon,
  CoffeeIcon,
  MusicNoteIcon,
];

function getIconForCategory(id: string) {
  return ICONS[1];
}

export default function Categories({ categories }: { categories: Category[] }) {
  if (!categories.length) {
    return null;
  }

  return (
    <div className="flex gap-6 snap-x overflow-x-auto">
      {categories.map((cat) => {
        const Icon = getIconForCategory(cat.id);
        return (
          <Link
            key={cat.id}
            href={`/search?category=${encodeURIComponent(cat.name)}-${cat.id}`}
            className="flex flex-1 flex-col items-center justify-center text-center transition hover:opacity-80"
          >
            <div className="flex items-center justify-center w-48 h-48 bg-blue-100 rounded-full mb-3 transition hover:bg-blue-200">
              <Icon size={48} weight="bold" className="text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-900 line-clamp-2">
              {cat.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
