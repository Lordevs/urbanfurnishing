import fs from "fs";
import path from "path";
import { LegalContent } from "@/components/common/legal-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Smart Range Leather",
  description: "Terms and conditions for using Smart Range Leather's services.",
};

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
