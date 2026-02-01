import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  setDataToLocalStorage,
  getDataFromLocalStorage,
} from "../utils/localstorage";

const ENGINES = {
  google: {
    name: "Google",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg",
  },
  duckduckgo: {
    name: "DuckDuckGo",
    icon: "https://upload.wikimedia.org/wikipedia/en/9/90/The_DuckDuckGo_Duck.png",
  },
  bing: {
    name: "Bing",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Bing_Logo.svg",
  },
  yahoo: {
    name: "Yahoo",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/83/Yahoo%21_icon_%282009-2013%29.svg",
  },
};

const SEARCH_URLS: Record<keyof typeof ENGINES, (q: string) => string> = {
  google: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  duckduckgo: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
  bing: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  yahoo: (q) => `https://search.yahoo.com/search?p=${encodeURIComponent(q)}`,
};

export default function SearchBar() {
  const [engine, setEngine] = useState<keyof typeof ENGINES>(
    getDataFromLocalStorage("preferredSearchEngine") || "google",
  );
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDataToLocalStorage("preferredSearchEngine", engine);
  }, [engine]);

  function handleSearch() {
    const q = query.trim();
    if (!q) return;

    window.location.href = SEARCH_URLS[engine](q);
  }

  return (
    <div ref={ref} className="search-bar">
      <Search className="w-4 h-4 text-gray-400 shrink-0" />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        placeholder={`Search with ${ENGINES[engine].name}…`}
        className="search-input placeholder-gray-400"
      />

      <span className="search-divider" />

      <div
        className="search-engine-icon cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <img src={ENGINES[engine].icon} alt={ENGINES[engine].name} />
      </div>

      {open && (
        <div className="search-dropdown">
          {Object.entries(ENGINES).map(([key, e]) => (
            <button
              key={key}
              onClick={() => {
                setEngine(key as keyof typeof ENGINES);
                setOpen(false);
              }}
              className="search-option"
            >
              <div className="search-engine-icon">
                <img src={e.icon} alt={e.name} />
              </div>
              {e.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
