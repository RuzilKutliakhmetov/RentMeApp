import React, { useState } from 'react'
import { FlatList, RefreshControl, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ItemBox from '../../components/UI/ItemBox'
import {
	getUsersSuggestedItems,
	publishSuggestedItems,
} from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'

const SuggestedItems = () => {
	// const [suggestedItems, setSuggestedItems] = useState(null)
	const { data: suggestedItems, refetch } = useAppWrite(getUsersSuggestedItems)
	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = async () => {
		setRefreshing(true)
		await refetch()
		setRefreshing(false)
	}

	const onPublish = async item => {
		setRefreshing(true)
		await publishSuggestedItems(item)
		await refetch()
		setRefreshing(false)
	}

	return (
		<SafeAreaView className='bg-primary h-full px-4 pt-2 pb-4'>
			<FlatList
				data={suggestedItems}
				contentContainerStyle={{ gap: 20 }}
				numColumns={2}
				renderItem={({ item }) => (
					<>
						<ItemBox numColumns={1} item={item}></ItemBox>
						<CustomButton
							numColumns={2}
							title='Опубликовать'
							handlePress={() => {
								onPublish(item)
							}}
							containerStyles='absolute right-2 top-2 min-h-[0px] p-1'
							textStyles=''
						/>
					</>
				)}
				ListHeaderComponent={
					<Text className='text-2xl text-white font-psemibold'>
						Неопубликованные объявления
					</Text>
				}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
	)
}

export default SuggestedItems
