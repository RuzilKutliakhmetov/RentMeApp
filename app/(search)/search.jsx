import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
	return (
		<SafeAreaView className='bg-primary h-full'>
			<View className='flex-1 justify-center text-center bg-black-100'>
				<Text className='text-3xl'>Search</Text>
			</View>
		</SafeAreaView>
	)
}

export default Search
