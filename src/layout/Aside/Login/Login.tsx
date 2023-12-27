import { useState } from 'react';
import { Dialog, DialogContent, Button } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import QrCodeLogin from './QrCodeLogin';
import Tab, { TAB_TYPE_ENUM } from './tab';
import PasswordLogin from './PasswordLogin';
import SmsLogin from './SmsLogin';

export default function Login () {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [tab, setTab] = useState(TAB_TYPE_ENUM.PASSWORD);

  return (
    <>
      <div
        className='w-10 h-10 bg-blue rounded-full text-center leading-10 text-white cursor-pointer select-none'
        onClick={handleOpen}>
        登录
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <Button className='absolute top-2 right-2 text-gray-400' disableElevation onClick={handleClose}>
          <CloseIcon />
        </Button>
        <DialogContent className='px-8 py-6'>
          <div className='flex flex-col'>
            <div className='flex'>
              <QrCodeLogin />
              <div className='mx-8 self-center w-[1px] h-[228px] bg-border' />
              <div className='flex flex-col flex-1'>
                <Tab tabValue={tab} onSelect={setTab} />
                {tab === TAB_TYPE_ENUM.PASSWORD ? <PasswordLogin /> : <SmsLogin />}
              </div>
            </div>
            <div className='flex flex-col items-center text-sm mt-8 text-info'>
              <span> 未注册过哔哩哔哩的手机号，我们将自动帮你注册账号 </span>
              <span>
                登录或完成注册即代表你同意
                <a
                  className='text-blue'
                  href='https://www.bilibili.com/protocal/licence.html'
                  target='_blank'
                  rel='noreferrer'>
                  用户协议
                </a>
                <span> 和 </span>
                <a
                  className='text-blue'
                  href='https://www.bilibili.com/blackboard/privacy-pc.html'
                  target='_blank'
                  rel='noreferrer'>
                  隐私政策
                </a>
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
