// src/api/apiClient.ts
const API_BASE_URL = 'http://31.44.4.39:8000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

class ApiClient {
  private baseURL: string;
  private url: string;
  private config: RequestInit;

  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.url = '';
    this.config = this.defaultConfig();
  }

  private defaultConfig(): RequestInit {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  setUrl(path: string) {
    this.url = this.baseURL + path;
    return this;
  }

  setMethod(method: HttpMethod) {
    this.config.method = method;
    return this;
  }

  setHeader(key: string, value: string) {
    (this.config.headers as Record<string, string>)[key] = value;
    return this;
  }

  setBody(data: unknown) {
    if (data !== null && data !== undefined) {
      this.config.body = JSON.stringify(data);
    }
    return this;
  }

  private async send() {
    try {
      const response = await fetch(this.url, this.config);

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
        (error as any).response = response;
        (error as any).data = data;
        throw error;
      }

      return data;
    } catch (err) {
      console.error('API request failed:', err);
      throw err;
    }
  }

  async get(path: string) {
    this.config = this.defaultConfig();
    this.setMethod('GET').setUrl(path);
    return this.send();
  }

  async post(path: string, data?: unknown) {
    this.config = this.defaultConfig();
    this.setMethod('POST').setUrl(path).setBody(data);
    return this.send();
  }

  async put(path: string, data?: unknown) {
    this.config = this.defaultConfig();
    this.setMethod('PUT').setUrl(path).setBody(data);
    return this.send();
  }

  async delete(path: string) {
    this.config = this.defaultConfig();
    this.setMethod('DELETE').setUrl(path);
    return this.send();
  }
}

// Экспорт фабрики
export const api = () => new ApiClient();
