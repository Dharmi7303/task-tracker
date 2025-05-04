// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility for merging Tailwind CSS classes and handling conditional class names
 * @param inputs - Class values to be merged together
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date for display
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Format a date with time
 * @param date - Date to format
 * @returns Formatted date and time string
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Get a user-friendly status display name
 * @param status - Task status from enum (TODO, IN_PROGRESS, DONE)
 * @returns User-friendly status string
 */
export function getStatusDisplayName(status: string): string {
  const statusMap: Record<string, string> = {
    'TODO': 'To Do',
    'IN_PROGRESS': 'In Progress',
    'DONE': 'Done'
  };
  
  return statusMap[status] || status;
}

/**
 * Truncate a string if it exceeds a certain length
 * @param str - String to truncate
 * @param length - Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 */
export function truncateString(str: string, length: number = 100): string {
  if (!str) return '';
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

/**
 * Simple validation for email format
 * @param email - Email to validate
 * @returns Boolean indicating if email format is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate a unique ID (can be useful for temporary IDs)
 * @returns Unique ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}