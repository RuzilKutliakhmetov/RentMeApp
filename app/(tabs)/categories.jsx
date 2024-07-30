import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/UI/SearchInput'
import { getParentCategories } from '../../lib/appwrite'

const Categories = () => {
	const [categoriesData, setCategoriesData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response = await getParentCategories()
				setCategoriesData(response)
			} catch (error) {
				Alert.alert('Error', error.message)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])
	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={categoriesData}
				className='px-3'
				keyExtractor={item => item.$id}
				renderItem={({ item }) => (
					<TouchableOpacity
						className='flex flex-row justify-start items-center h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200'
						onPress={() => {
							router.push({
								pathname: `/(search)/${item.$id}`,
								params: { categoryId: item.$id },
							})
						}}
					>
						<Text className='text-base mt-0.5 text-slate-400 font-pregular'>
							{item.title}
						</Text>
					</TouchableOpacity>
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

export default Categories
