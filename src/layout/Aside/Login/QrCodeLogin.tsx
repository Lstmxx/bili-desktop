import { QR_CODE_POLL_STATE_ENUM } from '@/constant/login';
import { getQrCode, handleQrCodePoll } from '@/lib/login/qr-code';
import { useEffect, useRef, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useTokenStore } from '@/store/token';

import { useSnackbar } from 'notistack';
import { handleGetSelfInfo } from '@/lib/user';

export default function QrCodeLogin () {
  const { setByQrCodeLoginRes } = useTokenStore();
  const { enqueueSnackbar } = useSnackbar();

  const reload = useRef(true);
  const [qrCode, setQrCode] = useState('');
  const qrCodeKey = useRef('');
  const [showWaitConfirm, setShowWaitConfirm] = useState(false);

  const timeoutId = useRef<any>();

  const cleanTimeout = () => {
    console.log('clean');
    reload.current = false;
    timeoutId.current && clearTimeout(timeoutId.current);
  };

  const handlePoll = async () => {
    const data = await handleQrCodePoll(qrCodeKey.current);
    console.log(data);
    setShowWaitConfirm(false);
    switch (data.code) {
      case QR_CODE_POLL_STATE_ENUM.WAIT_FOR_SCANNING:
        break;
      case QR_CODE_POLL_STATE_ENUM.WAIT_FOR_CONFIRM:
        !showWaitConfirm && setShowWaitConfirm(true);
        break;
      case QR_CODE_POLL_STATE_ENUM.INVALID:
        await handleGetQrCode();
        break;
      case QR_CODE_POLL_STATE_ENUM.SUCCESS:
        reload.current = false;
        await setByQrCodeLoginRes(data.url, data.refresh_token);
        handleGetSelfInfo();
        enqueueSnackbar('登录成功', { variant: 'success' });
        break;
    }

    if (reload.current) {
      timeoutId.current = setTimeout(() => {
        handlePoll();
      }, 500);
    }
  };

  const handleGetQrCode = async () => {
    const data = await getQrCode();
    setQrCode(data.qrCodeUrl);
    qrCodeKey.current = data.qrCodeKey;
  };

  const init = async () => {
    reload.current = true;
    await handleGetQrCode();
    await handlePoll();
  };
  useEffect(() => {
    init();
    return () => {
      cleanTimeout();
    };
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <h3>扫描二维码登录</h3>
      <div className='flex relative p-2 rounded-sm border border-blue border-solid'>
        <img className='outline outline-1 outline-blue' height={160} width={160} src={qrCode} />
        {showWaitConfirm && (
          <div
            className='
            absolute top-0 right-0 bottom-0
            left-0 h-full w-full flex flex-col justify-center items-center bg-black bg-opacity-50'>
            <CheckIcon className='text-blue w-8 h-8' />
            <p className='text-white'>请在手机上确认登录</p>
          </div>
        )}
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
