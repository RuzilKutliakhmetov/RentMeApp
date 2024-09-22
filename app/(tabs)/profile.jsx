import { Redirect, router } from 'expo-router'
import React, { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserInfoBox from '../../components/UI/UserInfoBox'
import { useGlobalContext } from '../../context/GlobalProvider'
import { signOut } from '../../lib/appwrite'

const Profile = () => {
	const { user, isLogged, setUser, setIsLogged } = useGlobalContext()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const logout = async () => {
		await signOut()
		setUser(null)
		setIsLogged(false)
		router.replace('/')
	}

	if (!isLogged) return <Redirect href='sign-in' />

	return (
		<SafeAreaView className='bg-primary h-full px-4 flex justify-between'>
			<View className=''>
				<UserInfoBox user={user} />

				<CustomButton
					title='Мои объявления'
					handlePress={() => {
						router.push({
							pathname: `/(userItems)/${user.$id}`,
							params: { userId: user.$id },
						})
					}}
					containerStyles='mt-4'
					isLoading={isSubmitting}
					textStyles=''
				/>
				{user?.role === 'user' ? (
					<CustomButton
						title='Неопубликованные объявления'
						handlePress={() => {
							router.push({
								pathname: `/(userItems)/suggestedItems`,
							})
						}}
						containerStyles='mt-4'
						isLoading={isSubmitting}
						textStyles=''
					/>
				) : (
					<View></View>
				)}
			</View>

			<CustomButton
				title='Выйти'
				handlePress={logout}
				containerStyles='my-4'
				isLoading={isSubmitting}
				textStyles=''
			/>
		</SafeAreaView>
	)
}

export default Profile
