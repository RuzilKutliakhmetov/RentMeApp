import { Stack } from 'expo-router'
import React from 'react'

const UserLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name='suggestedItems' options={{ headerShown: false }} />
				<Stack.Screen name='[userItems]' options={{ headerShown: false }} />
			</Stack>
		</>
	)
}

export default UserLayout
