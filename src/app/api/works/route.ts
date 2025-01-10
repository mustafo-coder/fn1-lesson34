import fs from "fs/promises";
import path from "path";

const filePath = path.resolve(process.cwd(), "data", "works.json");

const success = {
  status: 200,
  headers: {
    "Content-Type": "application/json",
  },
};
const errorMessage = {
  status: 409,
  headers: {
    "Content-Type": "application/json",
  },
};

export const GET = async () => {
  const data = await fs.readFile(filePath, "utf8");
  return new Response(data, success);
};
export const POST = async (req: any) => {
  const data = await fs.readFile(filePath, "utf-8");
  const works = JSON.parse(data);
  const body = await req.json();
  const { title, salary, currency, work_experience = 0, work_type } = body;
  if (title && salary && currency && work_type) {
    const newWork = {
      id: Date.now(),
      title,
      salary,
      currency,
      work_experience,
      work_type,
      created_at: new Date(),
    };
    works.push(newWork);
    await fs.writeFile(filePath, JSON.stringify(works, null, 2), "utf8");
    return new Response(JSON.stringify(newWork), success);
  } else {
    return new Response(
      JSON.stringify({ error: "All fields are required!" }),
      errorMessage
    );
  }
};
