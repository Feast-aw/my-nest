//创建响应工具类
import { ApiResponse } from './response.interface';

export class ResponseUtil {
  // 成功响应
  static success<T>(data: T, message = 'success'): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  // 错误响应
  static error(message: string, errorCode?: number): ApiResponse<null> {
    return {
      success: false,
      message,
      errorCode,
      timestamp: new Date().toISOString(),
    };
  }
}
