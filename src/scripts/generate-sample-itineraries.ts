/**
 * サンプルプラン用の旅程を生成するスクリプト
 *
 * 使用方法:
 * npx tsx src/scripts/generate-sample-itineraries.ts <sample-id>
 * npx tsx src/scripts/generate-sample-itineraries.ts all
 */

import * as path from "path";
import { config } from "dotenv";
config({ path: path.resolve(process.cwd(), ".env.local") });

import { generateItinerary } from "../lib/itinerary-generator";
import { samplePlans } from "../lib/sample-plans";
import { Itinerary, UserInput } from "../lib/types";
import * as fs from "fs";

async function generateItineraryForSample(
  sampleId: string
): Promise<Itinerary | null> {
  const sample = samplePlans.find((p) => p.id === sampleId);
  if (!sample) {
    console.error(`Sample plan not found: ${sampleId}`);
    return null;
  }

  console.log(`\n=== Generating itinerary for: ${sample.title} ===`);

  const input: UserInput = {
    ...sample.input,
    hasMustVisitPlaces: sample.input.hasMustVisitPlaces ?? false,
    mustVisitPlaces: sample.input.mustVisitPlaces ?? [],
  };

  const result = await generateItinerary(input, {
    topK: 1,
    fetchHeroImage: true,
    verbose: true,
  });

  if (result.success && result.itinerary) {
    console.log(`✅ Itinerary generated successfully!`);
    console.log(`   - ${result.itinerary.days.length} days`);
    console.log(
      `   - ${result.itinerary.days.reduce(
        (sum, d) => sum + d.activities.length,
        0
      )} total activities`
    );
    return result.itinerary;
  } else {
    console.error(`❌ Failed to generate itinerary: ${result.error}`);
    return null;
  }
}

function generateTypeScriptCode(
  sampleId: string,
  itinerary: Itinerary
): string {
  const varName = sampleId
    .split("-")
    .map((part, index) =>
      index === 0
        ? part.toLowerCase()
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    )
    .join("");

  return `
// ${itinerary.destination}
export const ${varName}Itinerary: Itinerary = ${JSON.stringify(
    itinerary,
    null,
    2
  )};
`;
}

async function main() {
  const sampleId = process.argv[2];

  if (!sampleId) {
    console.log("Available sample IDs:");
    samplePlans.forEach((p) => console.log(`  - ${p.id}: ${p.title}`));
    console.log(
      "\nUsage: npx tsx src/scripts/generate-sample-itineraries.ts <sample-id>"
    );
    console.log(
      "       npx tsx src/scripts/generate-sample-itineraries.ts all"
    );
    return;
  }

  if (sampleId === "all") {
    // Generate for all samples
    let results: Record<string, Itinerary> = {};
    const tsCodeParts: string[] = [];

    // Load existing JSON if available
    const jsonOutputPath = path.join(
      __dirname,
      "../data/sample-itineraries.json"
    );

    if (fs.existsSync(jsonOutputPath)) {
      try {
        const existingData = fs.readFileSync(jsonOutputPath, "utf-8");
        results = JSON.parse(existingData);
        console.log(
          `Loaded ${Object.keys(results).length} existing itineraries.`
        );
      } catch (error) {
        console.error("Failed to load existing itineraries:", error);
      }
    }

    for (const sample of samplePlans) {
      if (results[sample.id]) {
        console.log(
          `Skipping existing itinerary for: ${sample.title} (${sample.id})`
        );
        tsCodeParts.push(generateTypeScriptCode(sample.id, results[sample.id]));
        continue;
      }

      const itinerary = await generateItineraryForSample(sample.id);
      if (itinerary) {
        results[sample.id] = itinerary;
        tsCodeParts.push(generateTypeScriptCode(sample.id, itinerary));

        // Save incrementally to avoid losing progress
        fs.writeFileSync(
          jsonOutputPath,
          JSON.stringify(results, null, 2),
          "utf-8"
        );

        // Generate TypeScript mapping and save incrementally
        const mapEntries = Object.keys(results)
          .map((id) => {
            const varName = id
              .split("-")
              .map((part, index) =>
                index === 0
                  ? part.toLowerCase()
                  : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
              )
              .join("");
            return `  "${id}": ${varName}Itinerary,`;
          })
          .join("\n");

        const tsOutputPath = path.join(
          __dirname,
          "../lib/sample-itineraries.ts"
        );
        const tsContent = `
import { Itinerary } from "./types";

${tsCodeParts.join("\n")}

export function getSampleItinerary(sampleId: string): Itinerary | undefined {
  const itineraryMap: Record<string, Itinerary> = {
${mapEntries}
  };
  
  return itineraryMap[sampleId];
}
`;
        fs.writeFileSync(tsOutputPath, tsContent, "utf-8");
        console.log(`   - Updates saved to TS file.`);
      }

      // Add delay to avoid rate limiting
      console.log("Waiting 3 seconds before next generation...");
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    // Final Save JSON (already saving incrementally, but just to be safe)
    fs.mkdirSync(path.dirname(jsonOutputPath), { recursive: true });
    fs.writeFileSync(jsonOutputPath, JSON.stringify(results, null, 2), "utf-8");
    console.log(`\n✅ All itineraries saved to: ${jsonOutputPath}`);

    // Generate TypeScript mapping
    const mapEntries = Object.keys(results)
      .map((id) => {
        const varName = id
          .split("-")
          .map((part, index) =>
            index === 0
              ? part.toLowerCase()
              : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join("");
        return `  "${id}": ${varName}Itinerary,`;
      })
      .join("\n");

    const tsOutputPath = path.join(__dirname, "../lib/sample-itineraries.ts");
    const tsContent = `
import { Itinerary } from "./types";

${tsCodeParts.join("\n")}

export function getSampleItinerary(sampleId: string): Itinerary | undefined {
  const itineraryMap: Record<string, Itinerary> = {
${mapEntries}
  };
  
  return itineraryMap[sampleId];
}
`;
    fs.writeFileSync(tsOutputPath, tsContent, "utf-8");
    console.log(`\n✅ TypeScript file updated: ${tsOutputPath}`);
  } else {
    // Generate for single sample
    const itinerary = await generateItineraryForSample(sampleId);

    if (itinerary) {
      // Output JSON to console
      console.log("\n=== Generated Itinerary JSON ===");
      console.log(JSON.stringify(itinerary, null, 2));

      // Also save to file
      const outputPath = path.join(
        __dirname,
        `../data/sample-itinerary-${sampleId}.json`
      );
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, JSON.stringify(itinerary, null, 2), "utf-8");
      console.log(`\n✅ Saved to: ${outputPath}`);

      // Generate TypeScript code
      console.log("\n=== TypeScript Code ===");
      console.log(generateTypeScriptCode(sampleId, itinerary));
    }
  }
}

main().catch(console.error);
