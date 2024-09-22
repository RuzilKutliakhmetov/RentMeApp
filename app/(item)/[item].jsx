import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import UICarousel from '../../components/UI/UICarousel'
import UserInfoBox from '../../components/UI/UserInfoBox'
import icons from '../../constants/icons'
import { GetItem } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'

const ItemScreen = () => {
	const { itemId } = useLocalSearchParams()
	const { data: itemData, refetch } = useAppWrite(() => GetItem(itemId))

	useEffect(() => {
		if (itemId !== undefined) refetch()
	}, [itemId])

	return (
		<SafeAreaView className='bg-primary h-full'>
			<View className='px-4 py-4 flex flex-col'>
				<View className='flex flex-row text-wrap gap-4 items-center'>
					<TouchableOpacity
						className=''
						onPress={() => {
							router.push('/')
						}}
					>
						<Image
							source={icons.leftArrow}
							className='w-5 h-5'
							tintColor='white'
							resizeMode='contain'
						/>
					</TouchableOpacity>
					{itemData.title !== undefined ? (
						<Text className='flex-1 text-2xl text-white font-psemibold'>
							{itemData.title.length > 16
								? itemData.title.substring(0, 16) + '...'
								: itemData.title}
						</Text>
					) : (
						<></>
					)}
				</View>
			</View>
			<ScrollView>
				<UICarousel data={itemData.images} />
				<View className='flex flex-col px-4 py-4 gap-4'>
					<View className='flex-1'>
						<Text className='text-2xl text-white font-psemibold'>
							{itemData.title}
						</Text>
					</View>
					<View className=''>
						<Text className='text-m text-white font-psemibold'>
							Категория: {itemData.category?.title}
						</Text>
					</View>
					<View className=''>
						<Text className='text-m text-white font-psemibold'>
							Описание: {itemData.description}
						</Text>
					</View>
					<View className=''>
						<Text className='text-xl text-white font-psemibold'>
							Стоимость в день: {itemData.price_per_day} руб.
						</Text>
					</View>

					<View className=''>
						<UserInfoBox user={itemData.owner} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default ItemScreen
