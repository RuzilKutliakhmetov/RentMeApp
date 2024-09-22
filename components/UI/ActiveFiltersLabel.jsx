import React, { useEffect, useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { icons } from '../../constants'
import { getCategoryById } from '../../lib/appwrite'

const ActiveFiltersLabel = ({ item, onPressItem }) => {
	const [labelTitle, setLabelTitle] = useState('')

	const getTitle = async categoryId => {
		try {
			const response = await getCategoryById(categoryId)
			return response.title
		} catch (error) {
			Alert.alert('Error', error.message)
		}
	}

	useEffect(() => {
		if (item.key === 'price_from') setLabelTitle(`от ${item.value}`)
		if (item.key === 'price_to') setLabelTitle(`до ${item.value}`)
		if (item.key === 'category') setLabelTitle(getTitle(item.value))
		if (item.key === 'sorted')
			if (item.value === 'chip') setLabelTitle('Самые дешевые')
			else if (item.value === 'rich') setLabelTitle('Самые дорогие')
			else if (item.value === 'new') setLabelTitle('Самые новые')
		if (item.key === 'obtainMethod')
			if (item.value === 'pickup') setLabelTitle('Самовывоз')
			else if (item.value === 'delivery') setLabelTitle('Доставка')
	}, [])

	return (
		<View className='px-2 py-2 mt-2 flex flex-row justify-between items-center rounded-xl border-2 border-black-200'>
			<Text className='text-white mr-2'>{labelTitle}</Text>
			<TouchableOpacity
				onPress={() => {
					onPressItem()
				}}
			>
				<Image source={icons.close} className='w-3 h-3 ' resizeMode='contain' />
			</TouchableOpacity>
		</View>
	)
}

export default ActiveFiltersLabel
