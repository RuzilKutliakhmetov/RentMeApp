import { Image, Text, TouchableOpacity, View } from 'react-native'

import { router } from 'expo-router'
import { icons } from '../../constants'
const SearchInput = ({ navigate }) => {
	return (
		<TouchableOpacity
			className='flex-1'
			onPress={() => {
				router.push('(search)/search')
			}}
		>
			<View className='flex grow flex-row justify-between items-center h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary'>
				<Text className='text-base mt-0.5 text-slate-400 font-pregular'>
					Поиск по товару
				</Text>
				<Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
			</View>
		</TouchableOpacity>
	)
}

export default SearchInput
