import React from 'react'
import { Image, Text, View } from 'react-native'

const UserInfoBox = ({ user }) => {
	return (
		<View className='flex flex-row justify-between mt-2'>
			<View className='flex flex-col ml-2 justify-between'>
				<Text className='font-psemibold text-sm text-white'>
					{user?.first_name + ' ' + user?.last_name}
				</Text>
				<Text className='text-xs text-gray-100 font-pregular'>
					{user?.email}
				</Text>
				<Text className='text-xs text-gray-100 font-pregular'>
					{user?.phone_number}
				</Text>
			</View>
			<View className='w-16 h-16 border border-secondary rounded-lg flex justify-center items-center'>
				<Image
					source={{ uri: user?.avatar }}
					className='w-[100%] h-[100%] rounded-lg'
					resizeMode='cover'
				/>
			</View>
		</View>
	)
}

export default UserInfoBox
