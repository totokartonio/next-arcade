import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { isDifficulty } from "@/utils";
import { Difficulty } from "@/types";

function useCheckSearchParams() {
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

  return selectedDifficulty;
}

export default useCheckSearchParams;
