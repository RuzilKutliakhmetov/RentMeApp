import React, { useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/UI/EmptyState'
import FilterButton from '../../components/UI/FilterButton'
import ItemBox from '../../components/UI/ItemBox'
import SearchInput from '../../components/UI/SearchInput'
import { getAllItems } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'

const Home = () => {
	const { data: items, refetch } = useAppWrite(getAllItems)
	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = async () => {
		setRefreshing(true)
		await refetch()
		setRefreshing(false)
	}

	return (
		<SafeAreaView className='bg-primary h-full pt-4'>
			<FlatList
				data={items}
				numColumns={2}
				columnWrapperStyle={{
					gap: 10,
				}}
				contentContainerStyle={{ gap: 10 }}
				className='px-4'
				keyExtractor={(item, index) => index}
				renderItem={({ item }) => (
					<ItemBox numColumns={2} item={item} likesIsVisible={true}></ItemBox>
				)}
				ListHeaderComponent={() => (
					<View className='flex flex-row mb-2'>
						<SearchInput />
						<FilterButton />
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title='Товары не найдены.'
						subtitle='Загрузи объявление первым!'
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
	)
}

export default Home
