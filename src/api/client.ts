const TOKEN = import.meta.env.VITE_FOOTBALL_API_TOKEN as string;

const API_BASE =
  (import.meta.env.VITE_FOOTBALL_API_BASE_URL as string | undefined) ??
  'https://api.football-data.org/v4';

const CORS_PROXY =
  (import.meta.env.VITE_CORS_PROXY as string | undefined) ?? 'https://corsproxy.io/?';

function buildUrl(path: string, query: string): string {
  const suffix = `${path}${query ? `?${query}` : ''}`;
  if (import.meta.env.DEV) return `/api${suffix}`;
  return `${CORS_PROXY}${encodeURIComponent(`${API_BASE}${suffix}`)}`;
}

function getErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return 'Некорректный запрос. Проверьте параметры фильтрации.';
    case 401:
    case 403:
      return 'Данные недоступны. На данном тарифе доступны только матчи текущего сезона.';
    case 404:
      return 'Данные не найдены.';
    case 429:
      return 'Превышен лимит запросов к API. Пожалуйста, подождите минуту и попробуйте снова.';
    case 500:
    case 502:
    case 503:
      return 'Сервер временно недоступен. Попробуйте позже.';
    default:
      return `Не удалось получить данные (код ошибки: ${status}).`;
  }
}

interface FetchOptions {
  params?: Record<string, string | number | undefined>;
}

async function request<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const searchParams = new URLSearchParams();

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.set(key, String(value));
      }
    });
  }

  const url = buildUrl(path, searchParams.toString());

  const response = await fetch(url, {
    headers: {
      'X-Auth-Token': TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status));
  }

  return response.json() as Promise<T>;
}

export const apiClient = { request };
