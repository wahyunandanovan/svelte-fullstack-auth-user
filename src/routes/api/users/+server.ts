import { PrismaClient } from "@prisma/client";
import { json } from "@sveltejs/kit";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();
    return json(users);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  }
};

export const POST = async ({ request }: { request: Request }) => {
  const { name, email, password, role } = await request.json();

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });
    return json(newUser, { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create user" }), { status: 500 });
  }
};

export const PATCH = async ({ request }: { request: Request }) => {
  const { id, name, email, role } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, role },
    });
    return json(updatedUser);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update user" }), { status: 500 });
  }
};

export const DELETE = async ({ request }: { request: Request }) => {
  const { id } = await request.json();

  try {
    await prisma.user.delete({ where: { id } });
    return new Response(undefined, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete user" }), { status: 500 });
  }
};
