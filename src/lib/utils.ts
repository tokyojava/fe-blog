import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toFormData(data: Record<string, string>) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  return formData;
}

export function fromFormData(formData: FormData): Record<string, string> {
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = value as string;
  });
  return data;
}