import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ItemBox from '../../components/UI/ItemBox'
import { getUserItems } from '../../lib/appwrite'

const ItemScreen = () => {
	const { userId } = useLocalSearchParams()
	const [userItems, setUserItems] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getUserItems(userId)
				setUserItems(response)
			} catch (error) {
				Alert.alert('Error', error.message)
			}
		}
		fetchData()
	}, [])
	return (
		<SafeAreaView className='bg-primary h-full px-4 pt-2 pb-4'>
			<FlatList
				data={userItems}
				contentContainerStyle={{ gap: 20 }}
				renderItem={({ item }) => (
					<ItemBox numColumns={1} item={item}></ItemBox>
				)}
				ListHeaderComponent={
					<Text className='text-2xl text-white font-psemibold'>
						Мои объявления
					</Text>
				}
			/>
		</SafeAreaView>
	)
}

export default ItemScreen
