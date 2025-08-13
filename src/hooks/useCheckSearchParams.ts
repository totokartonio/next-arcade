import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { isDifficulty } from "@/utils";
import { Difficulty } from "@/types";

type Props = {
  selectedDifficulty: Difficulty;
  defaultWord: string | null;
  defaultDeck: string[] | null;
};

function useCheckSearchParams(): Props {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tentativeDifficulty = searchParams.get("difficulty");
  const selectedDifficulty: Difficulty = isDifficulty(tentativeDifficulty)
    ? tentativeDifficulty
    : "easy";

  useEffect(() => {
    if (!isDifficulty(tentativeDifficulty)) {
      const params = new URLSearchParams(searchParams);
      params.set("difficulty", selectedDifficulty);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [tentativeDifficulty, selectedDifficulty, router, searchParams]);

  const defaultWord = searchParams.get("word");

  const defaultDeck = useMemo(() => {
    const raw = searchParams.get("deck");
    if (!raw) return null;
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [searchParams]);

  return { selectedDifficulty, defaultWord, defaultDeck };
}

export default useCheckSearchParams;
