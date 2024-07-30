import { router, usePathname } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ImagesSlider from './ImagesSlider'

const ItemBox = ({ item }) => {
	const pathname = usePathname()
	return (
		<TouchableOpacity
			className='flex flex-col items-center px-1 w-1/2 h-32'
			onPress={() => {
				router.push({
					pathname: `/(item)/${item.$id}`,
					params: { itemId: item.$id },
				})
			}}
		>
			<View className='flex flex-row gap-3 items-start'>
				<View className='flex justify-center items-center flex-row flex-1'>
					<Text className='font-psemibold text-sm text-white' numberOfLines={1}>
						{item.title}
					</Text>
				</View>
			</View>
			<ImagesSlider images={item.images} />
		</TouchableOpacity>
	)
}

export default ItemBox
