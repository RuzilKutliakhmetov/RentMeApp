import { Redirect } from 'expo-router'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
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
		<View className='flex-1 justify-center'>
			<Text>Profile</Text>
			{user ? (
				<>
					<Text>{user.first_name}</Text>
					<Text>{user.last_name}</Text>
				</>
			) : (
				<Text>Profile</Text>
			)}

			<CustomButton
				title='Выйти'
				handlePress={logout}
				containerStyles='mt-7'
				isLoading={isSubmitting}
				textStyles=''
			/>
		</View>
	)
}

export default Profile
