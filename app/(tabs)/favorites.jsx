import { Redirect } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
	Alert,
	FlatList,
	Image,
	RefreshControl,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/UI/EmptyState'
import ItemBox from '../../components/UI/ItemBox'
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getUserFavoritesItems } from '../../lib/appwrite'

const Favorites = () => {
	const { user, isLogged } = useGlobalContext()
	const [userFavoritesItems, setUserFavoritesItems] = useState([])
	const [refreshing, setRefreshing] = useState(false)
	const [isAscending, setIsAscending] = useState(false)

	const fetchData = async () => {
		try {
			if (isLogged) {
				const response = await getUserFavoritesItems(user)
				setUserFavoritesItems(response)
			}
		} catch (error) {
			Alert.alert('Error', error.message)
		}
	}

	const onRefresh = async () => {
		setRefreshing(true)
		setIsAscending(false)
		fetchData()
		setRefreshing(false)
	}

	const sortData = () => {
		setIsAscending(!isAscending)
		setUserFavoritesItems(
			userFavoritesItems.sort((a, b) => {
				const nameA = a.title.toLowerCase()
				const nameB = b.title.toLowerCase()
				if (isAscending) {
					return nameA.localeCompare(nameB)
				} else {
					return nameB.localeCompare(nameA)
				}
			})
		)
	}

	useEffect(() => {
		fetchData()
	}, [refreshing])

	if (!isLogged) return <Redirect href='sign-in' />

	return (
		<SafeAreaView className='bg-primary h-full py-4'>
			<FlatList
				data={userFavoritesItems}
				numColumns={2}
				columnWrapperStyle={{ gap: 10 }}
				contentContainerStyle={{ gap: 8 }}
				className='px-4'
				keyExtractor={(item, index) => index}
				renderItem={({ item }) => <ItemBox item={item} />}
				ListHeaderComponent={() => (
					<View className='flex justify-between flex-row'>
						<Text className='text-2xl text-white font-psemibold'>
							Избранное
						</Text>
						<TouchableOpacity onPress={sortData}>
							<Image
								source={icons.sort}
								className='w-8 h-8'
								tintColor='white'
								resizeMode='contain'
							/>
						</TouchableOpacity>
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

export default Favorites
