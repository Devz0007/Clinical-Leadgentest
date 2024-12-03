import { AxiosError } from 'axios';

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'APIError';
  }

  static fromError(error: unknown): APIError {
    if (error instanceof AxiosError) {
      if (error.code === 'ECONNABORTED') {
        return new APIError('Request timeout - API took too long to respond', 408);
      }
      
      if (error.response) {
        return new APIError(
          `API request failed: ${error.response.data?.detailedMessage || error.response.data?.message || error.message}`,
          error.response.status,
          error.response.data
        );
      }
      
      return new APIError('Failed to connect to API', 500);
    }
    
    return new APIError(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      500
    );
  }
}