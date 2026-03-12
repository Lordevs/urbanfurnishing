import fs from "fs";
import path from "path";

import { LegalContent } from "@/components/common/legal-content";

export default async function TermsAndConditionsPage() {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "terms-and-conditions.md",
  );
  const content = fs.readFileSync(filePath, "utf8");

  return <LegalContent content={content} />;
}
