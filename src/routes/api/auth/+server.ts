import { PrismaClient } from "@prisma/client";
import { json, type RequestHandler } from "@sveltejs/kit";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password === password) {
      cookies.set("session", JSON.stringify({ email }), { path: "/" });
      return json({ message: "Login successful" });
    } else {
      return json({ message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return json({ message: "Server error" }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ cookies }) => {
  cookies.delete("session", { path: "/" });
  return json({ message: "Logged out" });
};

export const GET: RequestHandler = async ({ cookies }) => {
  try {
    const session = cookies.get("session");

    if (session) {
      const { email } = JSON.parse(session);

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        return json({ user: { email: user.email } });
      } else {
        return json({ message: "User not found" }, { status: 404 });
      }
    } else {
      return json({ message: "Not authenticated" }, { status: 401 });
    }
  } catch (error) {
    return json({ message: "Server error" }, { status: 500 });
  }
};
