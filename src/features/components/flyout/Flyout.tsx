import { useEffect, useState } from "react";

import { cn } from "@/libs/utils";
import { useCharactersStore } from "@/store/useCharactersStore";

import { DownloadButton } from "./DownloadButton";
import { RemoveAllButton } from "./RemoveAllButton";

export const Flyout = () => {
  const selectedCharacters = useCharactersStore((state) => state.selectedCharacters);
  const [, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedCharacters.length > 0) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [selectedCharacters.length]);

 return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-flyout-background/95 text-white shadow-lg p-4 flex justify-center items-center gap-4 shadow-3xl/20 max-sm:text-sm max-sm:gap-2 max-sm:px-3",
        "transition-transform duration-300",
        selectedCharacters.length > 0 ? "translate-y-0" : "translate-y-full",
      )}
    >
      <span>
        {selectedCharacters.length} item{selectedCharacters.length > 1 ? "s are" : " is"} selected
      </span>
      <RemoveAllButton />
      <DownloadButton items={selectedCharacters} />
    </div>
  );
};