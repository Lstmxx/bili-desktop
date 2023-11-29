import { getQrCode } from '@/lib/login/qr-code';
import { useEffect, useRef, useState } from 'react';

export default function QrCodeLogin () {
  const [qrCode, setQrCode] = useState('');
  const qrCodeKey = useRef('');
  const handleGetQrCode = async () => {
    const data = await getQrCode();
    setQrCode(data.qrCodeUrl);
    qrCodeKey.current = data.qrCodeKey;
  };
  useEffect(() => {
    handleGetQrCode();
  }, []);
  return (
		<div className='flex flex-col items-center'>
			<h3>扫描二维码登录</h3>
			<div className='flex relative p-2 rounded-sm border border-blue border-solid'>
				<img className='outline outline-1 outline-blue' height={160} width={160} src={qrCode} />
			</div>
			<div className='flex flex-col items-center text-center text-sm mt-4'>
				<span>
					请使用
					<a className='text-blue' href='https://app.bilibili.com/' target='_blank' rel='noreferrer'>
						哔哩哔哩客户端
					</a>
				</span>
				<span>扫码登录或扫码下载APP</span>
			</div>
		</div>
  );
}
