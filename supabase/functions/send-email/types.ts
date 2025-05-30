
export interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  from?: string;
  isProduction?: boolean;
}

export interface EmailResponse {
  success: boolean;
  data?: any;
  environment: string;
  recipient: string;
  retryCount: number;
}

export interface EmailError {
  error: string;
  code?: string;
  timestamp: string;
  environment: string;
}
