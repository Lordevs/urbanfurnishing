import fs from "fs";
import path from "path";
import { LegalContent } from "@/components/common/legal-content";

export default async function PrivacyPolicyPage() {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "privacy-policy.md",
  );
  const content = fs.readFileSync(filePath, "utf8");

  return <LegalContent content={content} />;
}
