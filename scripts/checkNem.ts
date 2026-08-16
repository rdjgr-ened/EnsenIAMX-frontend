import * as fs from "fs";
import { NEM_CURRICULUM_RELATIONAL_DATA } from "../src/data/nemCurriculumRelational";

// Check current data count
console.log("Current relational data entries:", NEM_CURRICULUM_RELATIONAL_DATA.length);

// Count by fase
const counts: Record<string, number> = {};
NEM_CURRICULUM_RELATIONAL_DATA.forEach((item) => {
  const key = `${item.fase} - ${item.nivel} (${item.grado})`;
  counts[key] = (counts[key] || 0) + 1;
});
console.log("Distribution:", counts);
