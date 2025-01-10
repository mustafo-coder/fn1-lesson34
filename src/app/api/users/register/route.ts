import fs from "fs/promises";
import path from "path";

const filePath = path.resolve(process.cwd(), "data", "users.json");

export const POST = async (request: any) => {
  const body = await request.json();
  const { email, password, job=null, name=null } = body;
  console.log(request);

  if (email && password) {
    const data = await fs.readFile(filePath, "utf8");
    const users = JSON.parse(data);
    let has = false;
    const newUser = {
      email,
      password,
      id: Date.now(),
      job,
      name
    }
    users.forEach((u: { email: string; password: string }) => {
      if (u.email == email) {
        has = true;
      }
    });
    if(has){
      return new Response(JSON.stringify({message: "User already exists!"}), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }else{
      users.push(newUser)
      await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf8");
      return new Response(JSON.stringify(newUser), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    return new Response(
      JSON.stringify({ error: "Email and password are required!" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
