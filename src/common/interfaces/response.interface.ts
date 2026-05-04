// 统一响应格式
export interface ApiResponse<T> {
  success: boolean; // 请求是否成功
  data?: T; // 成功时返回的数据
  message?: string; // 错误信息或提示信息
  errorCode?: number; // 错误码（可选）
  timestamp: string; // 响应时间戳
}
