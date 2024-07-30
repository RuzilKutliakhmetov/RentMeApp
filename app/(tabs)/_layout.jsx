import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
	return (
		<View className='flex items-center justify-center gap-2'>
			<Image
				source={icon}
				resizeMode='contain'
				tintColor={color}
				className='w-6 h-6'
			/>
			<Text
				className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
				style={{ color: color }}
			>
				{name}
			</Text>
		</View>
	)
}

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: '#FFA001',
					tabBarInactiveTintColor: '#CDCDE0',
					tabBarShowLabel: false,
					tabBarStyle: {
						backgroundColor: '#161622',
						borderTopWidth: 1,
						borderTopColor: '#232533',
						height: 84,
					},
				}}
			>
				<Tabs.Screen
					tabPr
					name='home'
					options={{
						title: 'Главная',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.home}
								color={color}
								name='Главная'
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='categories'
					options={{
						title: 'Категории',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.categories}
								color={color}
								name='Категории'
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='create'
					options={{
						title: 'Создать',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.plus}
								color={color}
								name='Создать'
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='favorites'
					options={{
						title: 'Избранное',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.favorites}
								color={color}
								name='Избранное'
								focused={focused}
							/>
						),
					}}
				/>

				<Tabs.Screen
					name='profile'
					options={{
						title: 'Profile',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.profile}
								color={color}
								name='Профиль'
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>

			{/* <Loader isLoading={loading} /> */}
			<StatusBar backgroundColor='#161622' style='light' />
		</>
	)
}

export default TabsLayout
