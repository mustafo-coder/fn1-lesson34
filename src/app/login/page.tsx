"use client";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function BasicTextFields() {
  const [isError, setError] = React.useState<null | string>(null);
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const res = await fetch(`${location.origin}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if(res.status != 200) throw new Error("")
      router.push('/')
    } catch (error: any) {
      console.log(error);
      setError(error?.data?.message)   
    }
  };
  return (
    <form onSubmit={handleSubmit} className="text-black">
      {isError && <p className="text-red-500">{isError}</p>}
      <input name="email" type="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
