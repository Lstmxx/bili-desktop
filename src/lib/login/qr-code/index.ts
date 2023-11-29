import { generateQrCode, qrCodePoll } from '@/api/login/qr-code';
import QRCode from 'qrcode';

export const getQrCode = async () => {
  const { data } = await generateQrCode();
  const { qrcode_key, url } = data;
  const qrCodeUrl = await QRCode.toDataURL(url);
  return {
    qrCodeUrl,
    qrCodeKey: qrcode_key
  };
};

export const handleQrCodePoll = async (key: string) => {
  const { data } = await qrCodePoll({ qrcode_key: key, source: 'main-fe-header' });
  return data;
};
