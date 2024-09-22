import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomLabel from '../../components/UI/CustomLabel'
import DropdownPicker from '../../components/UI/DropdownPicker'
import FormField from '../../components/UI/FormField'
import { icons } from '../../constants'
import {
	filtersDefaultState,
	obtainMethodsDefaultState,
	sortDefaultState,
} from '../../constants/defaultState'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getAllCategories, getParentCategories } from '../../lib/appwrite'
import { handleFilterPress, updateFilterListData } from '../../lib/filtersUtils'

const Filters = () => {
	const { searchFilter, setSearchFilter } = useGlobalContext()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [categoryList, setCategoryList] = useState(null)
	const [filterForm, setFilterForm] = useState(filtersDefaultState)
	const [sortListData, setSortListData] = useState(sortDefaultState.slice())
	const [obtainMethodListData, setObtainMethodListData] = useState(
		obtainMethodsDefaultState.slice()
	)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseAllCategories = await getAllCategories()
				const responseParentCategories = await getParentCategories()
				const result = []
				responseAllCategories.map(item => {
					if (item.parent_category !== null) {
						const parentCategory = responseParentCategories.find(
							parentCategory => parentCategory.$id === item.parent_category
						)
						result.push({
							value: item.$id,
							label: item.title,
							parent: parentCategory.$id,
						})
					} else result.push({ value: item.$id, label: item.title })
				})
				setCategoryList(result)
			} catch (error) {
				Alert.alert('Error', error.message)
			}
		}
		fetchData()
	}, [])

	const clearFilters = async () => {
		setFilterForm(filtersDefaultState)
		setSearchFilter(filtersDefaultState)
		setSortListData(sortDefaultState.slice())
		setObtainMethodListData(obtainMethodsDefaultState.slice())
	}

	const acceptFilters = async () => {
		setSearchFilter(filterForm)
		router.push('/(search)/search')
	}

	useEffect(() => {
		setFilterForm(searchFilter)

		setObtainMethodListData(
			updateFilterListData('obtainMethod', searchFilter.obtainMethod)
		)
		setSortListData(updateFilterListData('sorted', searchFilter.sorted))
	}, [searchFilter])

	return (
		<SafeAreaView className='bg-primary h-full'>
			<View className='px-4 py-4 flex flex-col'>
				<View className='flex flex-row justify-between items-center'>
					<View className='flex-1 flex flex-row items-center gap-4'>
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
						<View className='flex-1 '>
							<Text className='text-2xl text-white font-psemibold'>
								Фильтры
							</Text>
						</View>
					</View>
					<View className=''>
						<TouchableOpacity onPress={() => clearFilters()}>
							<Text className='text-md text-white font-psemibold'>
								Сбросить
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View>
					<Text className='mt-4 text-base text-gray-100 font-pmedium'>
						Сортировка
					</Text>
					<ScrollView
						className=''
						horizontal
						showsHorizontalScrollIndicator={false}
						directionalLockEnabled={true}
						alwaysBounceVertical={false}
					>
						<FlatList
							contentContainerStyle={{ alignSelf: 'flex-start' }}
							numColumns={sortListData.length}
							columnWrapperStyle={{
								gap: 10,
							}}
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
							data={sortListData}
							keyExtractor={(item, index) => index}
							renderItem={({ item, index }) => (
								<CustomLabel
									item={item}
									onPressItem={() =>
										handleFilterPress(
											sortListData,
											setSortListData,
											'sorted',
											item,
											index,
											setFilterForm
										)
									}
								/>
							)}
						/>
					</ScrollView>
				</View>
				<View className='mt-4'>
					{categoryList ? (
						<DropdownPicker
							title='Категории'
							data={categoryList}
							onValueChange={val => {
								setFilterForm({ ...filterForm, category: val })
							}}
							value={filterForm.category}
							categorySelectable={true}
						/>
					) : (
						<View></View>
					)}
				</View>

				<View className='mt-4'>
					<Text className='text-base text-gray-100 font-pmedium'>
						Цена (руб)
					</Text>
					<View className='flex flex-row justify-between'>
						<FormField
							value={filterForm.price_from}
							placeholder='От'
							handleChangeText={e =>
								setFilterForm({ ...filterForm, price_from: Number(e) })
							}
							otherStyles='flex-1 mx-2 space-y-0'
							keyboardType='numeric'
						/>
						<FormField
							value={filterForm.price_to}
							placeholder='До'
							handleChangeText={e =>
								setFilterForm({ ...filterForm, price_to: Number(e) })
							}
							otherStyles='flex-1 mx-2 space-y-0'
							keyboardType='numeric'
						/>
					</View>
				</View>
				<View className='mt-4'>
					<Text className='text-base text-gray-100 font-pmedium'>
						Получение
					</Text>
					<ScrollView
						className=''
						horizontal
						showsHorizontalScrollIndicator={false}
						directionalLockEnabled={true}
						alwaysBounceVertical={false}
					>
						<FlatList
							contentContainerStyle={{ alignSelf: 'flex-start' }}
							numColumns={obtainMethodListData.length}
							columnWrapperStyle={{
								gap: 10,
							}}
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
							data={obtainMethodListData}
							keyExtractor={(item, index) => index}
							renderItem={({ item, index }) => (
								<CustomLabel
									item={item}
									onPressItem={() =>
										handleFilterPress(
											obtainMethodListData,
											setObtainMethodListData,
											'obtainMethod',
											item,
											index,
											setFilterForm
										)
									}
								/>
							)}
						/>
					</ScrollView>
				</View>
				<CustomButton
					title='Применить фильтры'
					handlePress={acceptFilters}
					containerStyles='my-4'
					isLoading={isSubmitting}
					textStyles=''
				/>
			</View>
		</SafeAreaView>
	)
}

export default Filters
