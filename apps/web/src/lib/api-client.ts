import { getSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  const session = await getSession();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (session?.accessToken) {
    headers['Authorization'] = `Bearer ${session.accessToken}`;
  }
  return headers;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers as Record<string, string>),
    },
  });

  if (response.status === 401) {
    // Redirect to login on unauthorized
    if (typeof window !== 'undefined') {
      window.location.href = `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`;
    }
    throw new ApiError(401, 'Unauthorized');
  }

  if (response.status === 403) {
    throw new ApiError(403, 'Forbidden — you do not have permission to perform this action');
  }

  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = null;
    }
    const message =
      (errorData as { message?: string })?.message ??
      `HTTP Error ${response.status}`;
    throw new ApiError(response.status, message, errorData);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string, options?: RequestInit) =>
    apiRequest<T>(path, { method: 'GET', ...options }),

  post: <T>(path: string, body: unknown, options?: RequestInit) =>
    apiRequest<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    }),

  put: <T>(path: string, body: unknown, options?: RequestInit) =>
    apiRequest<T>(path, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    }),

  patch: <T>(path: string, body: unknown, options?: RequestInit) =>
    apiRequest<T>(path, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    }),

  delete: <T>(path: string, options?: RequestInit) =>
    apiRequest<T>(path, { method: 'DELETE', ...options }),
};

// Typed API helpers
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface Builder {
  id: string;
  name: string;
  slug: string;
  city: string;
  rera: string;
  rating: number;
  reviewCount: number;
  specialty: string;
}

export interface Review {
  id: string;
  builderId: string;
  userId: string;
  overallRating: number;
  summaryText: string;
  status: 'pending' | 'approved' | 'rejected' | 'on_hold';
  createdAt: string;
}

export const buildersApi = {
  list: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return api.get<PaginatedResponse<Builder>>(`/builders${query}`);
  },
  getBySlug: (slug: string) => api.get<Builder>(`/builders/${slug}`),
};

export const reviewsApi = {
  create: (data: Partial<Review>) => api.post<Review>('/reviews', data),
  getMyReviews: () => api.get<Review[]>('/reviews/mine'),
  saveDraft: (data: Partial<Review>) => api.post<Review>('/reviews/drafts', data),
};

export const rewardsApi = {
  getBalance: () => api.get<{ balance: number; pending: number }>('/rewards/balance'),
  requestPayout: (upiId: string, amount: number) =>
    api.post('/rewards/payout', { upiId, amount }),
};
