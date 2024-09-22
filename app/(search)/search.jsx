import { router } from 'expo-router'
import filter from 'lodash.filter'
import React, { useEffect, useState } from 'react'
import {
	Alert,
	FlatList,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActiveFiltersLabel from '../../components/UI/ActiveFiltersLabel'
import ItemBox from '../../components/UI/ItemBox'
import { icons } from '../../constants'
import { filtersDefaultState } from '../../constants/defaultState'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getSearchItems } from '../../lib/appwrite'

const Search = () => {
	const { searchFilter, setSearchFilter } = useGlobalContext()
	const [searchItems, setSearchItems] = useState(null)
	const [fullData, setFullData] = useState(null)
	const [searchInput, setSearchInput] = useState('')
	const [filtersListData, setFiltersListData] = useState(null)

	const fetchData = async () => {
		try {
			let filtersArray = Object.entries(searchFilter)
				.map(([key, value]) => ({
					key,
					value,
				}))
				.filter(item => item.value !== 0 && item.value !== null)
			if (filtersArray.length === 0) filtersArray = null
			setFiltersListData(filtersArray)

			const response = await getSearchItems(searchFilter)
			setSearchItems(response)
			setFullData(response)
		} catch (error) {
			Alert.alert('Error', error.message)
		}
	}
	const handleFilterPress = async selectedItem => {
		const updatedSearchFilter = { ...searchFilter }
		if (selectedItem.key in updatedSearchFilter) {
			if (selectedItem.key === 'price_from' || selectedItem.key === 'price_to')
				updatedSearchFilter[selectedItem.key] = 0
			else updatedSearchFilter[selectedItem.key] = null
		}
		setSearchFilter(updatedSearchFilter)

		let filteredFiltersListData = filtersListData.filter(
			item => item.key !== selectedItem.key
		)
		if (filteredFiltersListData.length === 0) filteredFiltersListData = null
		setFiltersListData(filteredFiltersListData)
	}

	const handleSearch = query => {
		setSearchInput(query)
		const formattedQuery = query.toLowerCase()
		const filteredData = filter(fullData, item => {
			return contains(item, formattedQuery)
		})
		setSearchItems(filteredData)
	}

	const contains = ({ title }, query) => {
		if (title.toLowerCase().includes(query)) {
			return true
		} else return false
	}

	useEffect(() => {
		fetchData()
	}, [searchFilter])

	const clearFilters = () => {
		setSearchFilter(filtersDefaultState)
	}

	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={searchItems}
				numColumns={2}
				columnWrapperStyle={{ gap: 10 }}
				contentContainerStyle={{ gap: 8 }}
				className='px-4'
				keyExtractor={(item, index) => index}
				renderItem={({ item }) => <ItemBox item={item} />}
				ListHeaderComponent={
					<View className='py-4 flex flex-col'>
						<View className='flex flex-row justify-between items-center'>
							<View className='flex-1 flex flex-row items-center gap-6'>
								<TouchableOpacity
									className=''
									onPress={() => {
										router.push('/')
									}}
								>
									<Image
										className='w-5 h-5'
										source={icons.leftArrow}
										tintColor='white'
										resizeMode='contain'
									/>
								</TouchableOpacity>
								<View className='flex-1'>
									<View className='w-full px-4 mt-2 h-12  bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center'>
										<TextInput
											className='flex-1 text-white font-psemibold text-base'
											placeholderTextColor='#7B7B8B'
											value={searchInput}
											placeholder='Поиск по товару'
											onChangeText={e => {
												handleSearch(e)
											}}
										/>
									</View>
								</View>
							</View>
						</View>
						<ScrollView
							className=''
							horizontal
							showsHorizontalScrollIndicator={false}
							directionalLockEnabled={true}
							alwaysBounceVertical={false}
						>
							{filtersListData ? (
								<FlatList
									contentContainerStyle={{ alignSelf: 'flex-start' }}
									numColumns={6}
									columnWrapperStyle={{ gap: 10 }}
									showsVerticalScrollIndicator={false}
									showsHorizontalScrollIndicator={false}
									data={filtersListData}
									keyExtractor={(item, index) => index}
									ListFooterComponent={
										<TouchableOpacity onPress={() => clearFilters()}>
											<Text className='text-md text-white font-psemibold'>
												Сбросить фильтры
											</Text>
										</TouchableOpacity>
									}
									renderItem={({ item, index }) => (
										<ActiveFiltersLabel
											item={item}
											onPressItem={() => {
												handleFilterPress(item)
											}}
										/>
									)}
								/>
							) : (
								<View></View>
							)}
						</ScrollView>

						<View className='mt-2'>
							{searchItems ? (
								<Text className='text-xl text-white font-psemibold'>
									Мы нашли {searchItems.length} объявлений
								</Text>
							) : (
								<View></View>
							)}
						</View>
					</View>
				}
				// refreshControl={
				// 	<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				// }
			/>
		</SafeAreaView>
	)
}

export default Search
