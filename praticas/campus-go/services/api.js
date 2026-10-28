export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

export async function fetchNotices() {
  const response = await fetch(`${API_URL}/posts?_limit=10`);

  if (!response.ok) {
    throw new Error('Não foi possível carregar os avisos.');
  }

  return response.json();
}
