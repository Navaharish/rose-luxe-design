import { db } from "./db";
import { profiles } from "@shared/schema";

async function createTempUser() {
  try {
    await db.insert(profiles).values({
      id: "00000000-0000-0000-0000-000000000000",
      email: "guest@example.com",
      fullName: "Guest User",
    }).onConflictDoNothing();
    
    console.log("✅ Temp user created!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createTempUser();
