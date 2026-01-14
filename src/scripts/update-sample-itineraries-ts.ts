import * as fs from "fs";
import * as path from "path";
import { Itinerary } from "../lib/types";

const jsonPath = path.join(__dirname, "../data/sample-itineraries.json");
const tsPath = path.join(__dirname, "../lib/sample-itineraries.ts");

const data: Record<string, Itinerary> = JSON.parse(
  fs.readFileSync(jsonPath, "utf-8")
);

const tsCodeParts: string[] = [];
const mapEntries: string[] = [];

for (const [id, itinerary] of Object.entries(data)) {
  const varName = id
    .split("-")
    .map((part, index) =>
      index === 0
        ? part.toLowerCase()
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    )
    .join("");

  tsCodeParts.push(`
// ${itinerary.destination}
export const ${varName}Itinerary: Itinerary = ${JSON.stringify(
    itinerary,
    null,
    2
  )};
`);
  mapEntries.push(`  "${id}": ${varName}Itinerary,`);
}

const fileContent = `
import { Itinerary } from "./types";

${tsCodeParts.join("\n")}

export function getSampleItinerary(sampleId: string): Itinerary | undefined {
  const itineraryMap: Record<string, Itinerary> = {
${mapEntries.join("\n")}
  };
  
  return itineraryMap[sampleId];
}
`;

fs.writeFileSync(tsPath, fileContent, "utf-8");
console.log(`Updated ${tsPath}`);
