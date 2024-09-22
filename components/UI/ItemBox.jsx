import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import {
	ChangeItemToFavorites,
	SearchItemOnUserFavoritesList,
} from '../../lib/appwrite'

const ItemBox = ({ numColumns, item, likesIsVisible }) => {
	const { user } = useGlobalContext()
	const width = numColumns === 1 ? 'w-full' : 'w-40'
	const [isFavorite, setIsFavorite] = useState(false)

	useEffect(() => {
		if (user)
			SearchItemOnUserFavoritesList(user.$id, item.$id)
				.then(response => {
					setIsFavorite(response)
				})
				.catch(error => {
					console.log(error)
				})
	}, [user])

	return (
		<TouchableOpacity
			className={`flex flex-1 flex-col ${width} bg-black-100 border-2 border-black-200 rounded-md`}
			onPress={() => {
				router.push({
					pathname: `/(item)/${item.$id}`,
					params: { itemId: item.$id },
				})
			}}
		>
			<Image
				source={{ uri: item.images[0].url }}
				className='w-full h-32 rounded-t-md'
				resizeMode='cover'
			/>
			<View className='w-full h-min p-1'>
				<Text className='font-pmedium text-sm text-white' numberOfLines={2}>
					{item.title}
				</Text>
			</View>
			{likesIsVisible ? (
				<TouchableOpacity
					className='absolute right-2 top-2'
					onPress={() => {
						ChangeItemToFavorites(user.$id, item).then(response => {
							setIsFavorite(response)
						})
					}}
				>
					{isFavorite ? (
						<Image
							source={icons.heart}
							className='w-5 h-5'
							resizeMode='contain'
							tintColor='#FFA001'
						/>
					) : (
						<Image
							source={icons.heart}
							className='w-5 h-5'
							resizeMode='contain'
							tintColor='#ffffff'
						/>
					)}
				</TouchableOpacity>
			) : (
				<></>
			)}
		</TouchableOpacity>
	)
}

export default ItemBox
