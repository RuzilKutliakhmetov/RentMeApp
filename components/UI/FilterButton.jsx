import { router } from 'expo-router'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { icons } from '../../constants'

const FilterButton = () => {
	return (
		<TouchableOpacity
			className='flex flex-row ml-2'
			onPress={() => {
				router.push('(search)/filters')
			}}
		>
			<View className='flex flex-row items-center h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary'>
				<Image
					source={icons.filter}
					className='w-5 h-5'
					tintColor='white'
					resizeMode='contain'
				/>
			</View>
		</TouchableOpacity>
	)
}

export default FilterButton
