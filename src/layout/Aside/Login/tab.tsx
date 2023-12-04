export enum TAB_TYPE_ENUM {
	'PASSWORD' = '1',
	'SMS' = '2',
}

export default function Tab ({ tabValue, onSelect }: { tabValue: TAB_TYPE_ENUM; onSelect?: (value: TAB_TYPE_ENUM) => void; }) {
	const tabList = [
		{ label: '密码登录', value: TAB_TYPE_ENUM.PASSWORD },
		{ label: '短信登录', value: TAB_TYPE_ENUM.SMS }
	];

	const handleSelect = (value: TAB_TYPE_ENUM) => {
		onSelect && onSelect(value);
	};
	return (
		<div className='flex justify-center divide-x divide-border divide-solid divide-y-0'>
			{tabList.map((item, index) => (
				<h3
					className={`cursor-pointer px-4  ${tabValue === item.value ? 'text-blue' : ''}`}
					key={index}
					onClick={() => {
						handleSelect(item.value);
					}}
				>
					{item.label}
				</h3>
			))}
		</div>
	);
}
