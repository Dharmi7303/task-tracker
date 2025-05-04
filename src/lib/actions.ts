// lib/actions.ts
'use server';

import { prisma } from './db';
import { auth, signIn, signOut } from './auth';
import { redirect } from 'next/navigation';
import { hash } from 'bcrypt';
import { revalidatePath } from 'next/cache';

// User Registration
export async function registerUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return { error: 'All fields are required' };
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'User with this email already exists' };
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: 'Registration successful! Please log in.' };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Something went wrong during registration.' };
  }
}

// User Login
export async function loginUser({ email, password }: { email: string, password: string }) {
  try {
    const result = await signIn('credentials', { 
      email, 
      password, 
      redirect: false 
    });
    
    if (result?.error) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    // Return success instead of redirecting
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Invalid Email or Password' };
  }
}
// User Logout
export async function logoutUser() {
  await signOut({ redirectTo: '/' });
}

// Get Current User
export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

// Task Operations
export async function createTask(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    return { error: 'You must be logged in' };
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;

  if (!title) {
    return { error: 'Title is required' };
  }

  try {
    await prisma.task.create({
      data: {
        title,
        description,
        status: status as any || 'TODO',
        userId: session.user.id,
      },
    });
    
    revalidatePath('/dashboard');
    return { success: 'Task created successfully' };
  } catch (error) {
    console.error('Create task error:', error);
    return { error: 'Failed to create task' };
  }
}

export async function updateTask(taskId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    return { error: 'You must be logged in' };
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;

  if (!title) {
    return { error: 'Title is required' };
  }

  try {
    // Check if task belongs to user
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.userId !== session.user.id) {
      return { error: 'Task not found or access denied' };
    }

    await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        status: status as any,
      },
    });
    
    revalidatePath('/dashboard');
    revalidatePath(`/task/${taskId}`);
    return { success: 'Task updated successfully' };
  } catch (error) {
    console.error('Update task error:', error);
    return { error: 'Failed to update task' };
  }
}

export async function deleteTask(taskId: string) {
  const session = await auth();
  if (!session?.user) {
    return { error: 'You must be logged in' };
  }

  try {
    // Check if task belongs to user
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.userId !== session.user.id) {
      return { error: 'Task not found or access denied' };
    }

    await prisma.task.delete({
      where: { id: taskId },
    });
    
    revalidatePath('/dashboard');
    return { success: 'Task deleted successfully' };
  } catch (error) {
    console.error('Delete task error:', error);
    return { error: 'Failed to delete task' };
  }
}

export async function getUserTasks() {
  const session = await auth();
  if (!session?.user) {
    return [];
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return tasks;
  } catch (error) {
    console.error('Get tasks error:', error);
    return [];
  }
}

export async function getTask(taskId: string) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId: session.user.id,
      },
    });
    
    return task;
  } catch (error) {
    console.error('Get task error:', error);
    return null;
  }
}