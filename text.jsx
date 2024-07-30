import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from './components/UI/CustomButton'
import FormField from './components/UI/FormField'
import { icons } from './constants'
import { useGlobalContext } from './context/GlobalProvider'
const Create = () => {
	const { user } = useGlobalContext()
	const [uploading, setUploading] = useState(false)
	const [form, setForm] = useState({
		title: '',
		description: '',
		price_per_day: 0,
		category: null,
		images: [],
		owner: user,
		availability: true,
	})

	const openPicker = async selectType => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes:
				selectType === 'image'
					? ImagePicker.MediaTypeOptions.Images
					: ImagePicker.MediaTypeOptions.Videos,
			aspect: [4, 3],
			quality: 1,
		})
		console.log(result)
		if (!result.canceled) {
			if (selectType === 'image') {
				setForm({
					...form,
					images: [...form.images, result.assets[0]],
				})
			}
		}
	}

	const submit = async () => {}

	return (
		<SafeAreaView className='bg-primary h-full'>
			<ScrollView className='px-4 my-6'>
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
					value={form.title}
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
					handleChangeText={e => setForm({ ...form, price_per_day: Number(e) })}
					otherStyles='mt-6'
					multiline
					numberOfLines={10}
				/>

				<View className='mt-7 space-y-2'>
					<Text className='text-base text-gray-100 font-pmedium'>
						Загрузи фотографии
					</Text>
					<TouchableOpacity onPress={() => openPicker('image')}>
						{form.images.length > 0 ? (
							<FlatList
								data={form.images}
								renderItem={({ item }) => (
									<View>
										<Image
											source={{ uri: item.url }}
											resizeMode='cover'
											className='w-full h-64 rounded-2xl'
										/>
									</View>
								)}
							/>
						) : (
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
						)}
					</TouchableOpacity>
				</View>

				<CustomButton
					title='Опубликовать'
					handlePress={submit}
					containerStyles='mt-7'
					isLoading={uploading}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Create
