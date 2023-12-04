import { InputBase, Button, IconButton, type InputBaseProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, type SubmitHandler, type UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';

interface ISubmitData {
	username: '';
	password: '';
}

const Input = (props: InputBaseProps & { label: string; register: UseFormRegisterReturn<any>; }) => {
	const [type, setType] = useState(props.type);
	const handleSetType = () => {
		setType(type === 'password' ? 'text' : 'password');
	};
	return (
		<div className='flex py-3 px-5 items-center'>
			<span className='mr-4 whitespace-nowrap'>{props.label}</span>
			<InputBase className='shadow-none' {...props} type={type} {...props.register} />
			{props.type === 'password' && <IconButton onClick={handleSetType}>{type === 'password' ? <VisibilityOff /> : <Visibility />}</IconButton>}
		</div>
	);
};

export default function PasswordLogin () {
	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid }
	} = useForm<ISubmitData>();
	const onSubmit: SubmitHandler<ISubmitData> = (data) => {
		console.log(data);
	};
	return (
		<form className='flex flex-col'>
			<div className='flex flex-col border border-border border-solid rounded-md divide-border divide-solid divide-y divide-x-0'>
				<Input label='账号' placeholder='请输入账号' fullWidth register={register('username', { required: true })} />
				<Input label='密码' placeholder='请输入密码' type='password' fullWidth register={register('password', { required: true })} />
			</div>
			<div className='flex gap-2 mt-4'>
				{/* <Button className='flex-1'>注册</Button> */}
				<Button variant='contained' color='primary' className='flex-1' disabled={!isDirty || !isValid} onClick={handleSubmit(onSubmit)}>
					登录
				</Button>
			</div>
		</form>
	);
}
