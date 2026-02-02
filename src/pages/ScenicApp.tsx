import { useEffect } from "react";
import { SearchBar } from "../components";
import { initShortcuts } from "../utils";

export default function ScenicApp() {

  useEffect(() => {
    initShortcuts();
  }, []);
  return (
    <main className="p-4">
      <header className="flex justify-between items-center">
        <div>1</div>
        <SearchBar />
        <div>3</div>
      </header>
    </main>
  );
}
