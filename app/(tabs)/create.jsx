import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
	Alert,
	FlatList,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/UI/CustomButton'
import FormField from '../../components/UI/FormField'
import SelectListField from '../../components/UI/SelectListField'
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import {
	createItem,
	getChildCategory,
	getParentCategories,
} from '../../lib/appwrite'
const Create = () => {
	const { user } = useGlobalContext()
	const [uploading, setUploading] = useState(false)
	const [selectListParentCategory, setSelectListParentCategory] = useState([])
	const [selectedParentCategory, setSelectedParentCategory] = useState(null)
	const [selectListChildCategory, setSelectListChildCategory] = useState([])
	const [selectedChildCategory, setSelectedChildCategory] = useState(null)
	const [form, setForm] = useState({
		title: '',
		description: '',
		price_per_day: null,
		category: null,
		images: [],
		owner: user,
		availability: true,
	})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getParentCategories()
				const result = []
				response.map(item => {
					result.push({ key: item, value: item.title })
				})
				setSelectListParentCategory(result)
			} catch (error) {
				Alert.alert('Error', error.message)
			}
		}
		fetchData()
	}, [])

	useEffect(() => {
		if (selectedParentCategory) {
			const fetchData = async () => {
				try {
					const response = await getChildCategory(selectedParentCategory.$id)

					const result = []
					response.map(item => {
						result.push({ key: item, value: item.title })
					})
					setSelectListChildCategory(result)
				} catch (error) {
					Alert.alert('Error', error.message)
				}
			}
			fetchData()
		}
	}, [selectedParentCategory])

	const openPicker = async selectType => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes:
				selectType === 'image'
					? ImagePicker.MediaTypeOptions.Images
					: ImagePicker.MediaTypeOptions.Videos,
			aspect: [4, 3],
			quality: 1,
		})
		if (!result.canceled) {
			if (selectType === 'image') {
				setForm({
					...form,
					images: [...form.images, result.assets[0]],
				})
			}
		}
	}

	const removeImage = index => {
		setForm({
			...form,
			images: form.images.filter((_, i) => i !== index),
		})
	}

	const submit = async () => {
		if (
			(form.title === '') |
			(form.description === '') |
			!form.price_per_day |
			!form.category |
			(form.images.length === 0)
		) {
			return Alert.alert('Пожалуйста, заполните все поля')
		}

		setUploading(true)
		try {
			await createItem(form)
			Alert.alert('Успешно!', 'Объявление успешно опубликовано')
			router.push('/home')
		} catch (error) {
			Alert.alert('Ошибка', error.message)
		} finally {
			setForm({
				title: '',
				description: '',
				price_per_day: '',
				category: null,
				images: [],
			})
			setSelectedChildCategory(null)
			setSelectedParentCategory(null)
			setUploading(false)
		}
	}

	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={form.images}
				className='px-4 my-6'
				ListHeaderComponent={
					<ScrollView className=''>
						<Text className='text-2xl text-white font-psemibold'>
							Размести объявление
						</Text>
						<FormField
							title='Название'
							value={form.title}
							placeholder='Название товара'
							handleChangeText={e => setForm({ ...form, title: e })}
							otherStyles='mt-6'
						/>

						<FormField
							title='Описание'
							value={form.description}
							placeholder='Описание товара'
							handleChangeText={e => setForm({ ...form, description: e })}
							otherStyles='mt-6'
							multiline
							numberOfLines={10}
						/>

						<FormField
							title='Стоимость в сутки'
							value={form.price_per_day}
							placeholder='Стоимость'
							handleChangeText={e =>
								setForm({ ...form, price_per_day: Number(e) })
							}
							otherStyles='mt-6'
							multiline
							numberOfLines={10}
						/>
						{/* <FormField
							title='Категория'
							value={form.price_per_day}
							placeholder='Стоимость'
							handleChangeText={e => setForm({ ...form, category: Number(e) })}
							otherStyles='mt-6'
							multiline
							numberOfLines={10}
						/> */}
						<SelectListField
							title='Категория'
							handleSelect={e => {
								setSelectedParentCategory(e)
							}}
							data={selectListParentCategory}
						/>
						{selectedParentCategory ? (
							<SelectListField
								title='Подкатегория'
								handleSelect={e => {
									setForm({ ...form, category: e })
								}}
								data={selectListChildCategory}
							/>
						) : (
							<></>
						)}
						<View className='mt-7 space-y-2'>
							<Text className='text-base text-gray-100 font-pmedium'>
								Загрузи фотографии
							</Text>
						</View>
						<TouchableOpacity onPress={() => openPicker('image')}>
							<View className='w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2'>
								<Image
									source={icons.upload}
									resizeMode='contain'
									alt='upload'
									className='w-5 h-5'
								/>
								<Text className='text-sm text-gray-100 font-pmedium'>
									Выбрать файл
								</Text>
							</View>
						</TouchableOpacity>
					</ScrollView>
				}
				keyExtractor={(item, index) => index}
				renderItem={({ item, index }) => (
					<View>
						<Image
							source={{ uri: item.uri }}
							resizeMode='cover'
							className='mt-2 w-full h-64 rounded-2xl'
						/>
						<TouchableOpacity
							onPress={() => {
								removeImage(index)
							}}
						>
							<Text>убрать</Text>
						</TouchableOpacity>
					</View>
				)}
				ListFooterComponent={
					<View>
						<CustomButton
							title='Опубликовать'
							handlePress={submit}
							containerStyles='mt-7'
							isLoading={uploading}
						/>
					</View>
				}
			/>
		</SafeAreaView>
	)
}

export default Create
