import { Link } from 'expo-router'
import React from 'react'
import { Image, View } from 'react-native'
import { icons } from '../../constants'

const FilterButton = () => {
	return (
		<Link className='' href='filters'>
			<View className='flex flex-row items-center w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary'>
				<Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
			</View>
		</Link>
	)
}

export default FilterButton
