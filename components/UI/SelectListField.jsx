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
					dropdownTextStyles={{
						color: '#7B7B8B',
						fontSize: 16,
						lineHeight: 24,
					}}
					inputStyles={{
						fontSize: 16,
						color: 'white',
						textDecorationColor: 'white',
					}}
					boxStyles={{
						borderColor: '#232533',
						backgroundColor: '#1e1e2d',
						height: 50,
					}}
					dropdownStyles={{
						borderColor: '#232533',
						backgroundColor: '#1e1e2d', //
					}}
					setSelected={handleSelect}
					data={data}
					placeholder={title}
					searchPlaceholder={''}
					title={title}
					{...props}
				/>
			</View>
		</View>
	)
}

export default SelectListField
