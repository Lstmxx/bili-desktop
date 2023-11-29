import type { QR_CODE_POLL_STATE_ENUM } from '@/constant/login';

export interface IGenerateQrCodeRes {
  qrcode_key: string
  url: string
}

export interface IQrCodePollParams {
  qrcode_key: string
  source: string
}

export interface IQrCodePollRes {
  url: string
  refresh_token: string
  timestamp: number
  code: QR_CODE_POLL_STATE_ENUM
  message: string
}
