import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GetItem } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'

const ItemScreen = () => {
	const { itemId } = useLocalSearchParams()
	const { data: itemData, refetch } = useAppWrite(() => GetItem(itemId))
	console.log(itemData)
	useEffect(() => {
		if (itemId !== undefined) refetch()
	}, [itemId])

	return (
		<SafeAreaView className='bg-primary h-full'>
			<Text>{itemData.title}</Text>
		</SafeAreaView>
	)
}

export default ItemScreen
