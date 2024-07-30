import { Stack } from 'expo-router'
import React from 'react'

const ItemLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name='[item]' options={{ headerShown: false }} />
			</Stack>
		</>
	)
}

export default ItemLayout
