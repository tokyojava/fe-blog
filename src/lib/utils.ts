import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toFormData(data: Record<string, string | string[]>) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(key, v));
    } else {
      formData.append(key, value);
    }
  });
  return formData;
}

export function fromFormData(formData: FormData): Record<string, string | string[]> {
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = value as string;
  });
  return data;
}

export function formatReadableTime(updatedAt: Date | string): string {
  const date = new Date(updatedAt);

  // 输出格式：2025-10-08 14:32
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
}