import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/UI/SearchInput'
import { getChildCategory } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'

const Category = () => {
	const { categoryId } = useLocalSearchParams()
	const { data: categories, refetch } = useAppWrite(() =>
		getChildCategory(categoryId)
	)

	useEffect(() => {
		refetch()
	}, [categoryId])

	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={categories}
				className='px-3'
				keyExtractor={item => item.$id}
				renderItem={({ item }) => (
					<View className='flex flex-row justify-start items-center h-16 px-4 mb-4 bg-black-100 rounded-2xl border-2 border-black-200'>
						<TouchableOpacity
							className=''
							onPress={() => {
								router.push('(search)/search')
							}}
						>
							<Text className='text-base mt-0.5 text-slate-400 font-pregular'>
								{item.title}
							</Text>
						</TouchableOpacity>
					</View>
				)}
				ListHeaderComponent={() => (
					<View className='flex flex-row my-6'>
						<SearchInput />
					</View>
				)}
			/>
		</SafeAreaView>
	)
}

export default Category
