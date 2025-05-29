// Safe array operations
export const safeFind = (arr, callback) => {
  if (!Array.isArray(arr)) {
    console.error('Attempted .find() on non-array:', arr);
    return null;
  }
  return arr.find(callback);
};

// Usage:
// import { safeFind } from '@/utils/arraySafe';
// const user = safeFind(users, u => u.id === id);