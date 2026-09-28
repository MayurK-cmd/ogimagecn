import path from "node:path";

import { readFileFromRoot } from "@/lib/read-file";

export const readOptionalFromRoot = async (
  relativePath: string
): Promise<string | null> => {
  try {
    return await readFileFromRoot(relativePath);
  } catch {
    return null;
  }
};

// Blocks live at registry/blocks/<name>/index.tsx (with a colocated config.ts
// that is never distributed); components at registry/components/<name>.tsx.
// Both ship to components/og/<name>.tsx via their registry.json target.
export const getRegistrySource = async (name: string): Promise<string | null> =>
  (await readOptionalFromRoot(
    path.join("registry", "blocks", name, "index.tsx")
  )) ??
  readOptionalFromRoot(path.join("registry", "components", `${name}.tsx`));
