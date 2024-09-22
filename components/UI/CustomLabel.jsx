import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const CustomLabel = ({ item, onPressItem }) => {
	return (
		<TouchableOpacity
			onPress={() => {
				onPressItem()
			}}
			className={`px-4 py-2 mt-2  rounded-xl border-2 border-black-200 ${
				!item.focused ? 'bg-black-100' : 'bg-secondary-100'
			}`}
		>
			<Text className='text-white'>{item.value}</Text>
		</TouchableOpacity>
	)
}

export default CustomLabel
