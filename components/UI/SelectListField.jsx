import React from 'react'
import { Text, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
const SelectListField = ({
	title,
	data,
	handleSelect,
	otherStyles,
	...props
}) => {
	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
			<View>
				<SelectList
					className='w-full px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center '
					setSelected={handleSelect}
					data={data}
					placeholder={title}
					searchPlaceholder={title}
					title={title}
					{...props}
				/>
			</View>
		</View>
	)
}

export default SelectListField
