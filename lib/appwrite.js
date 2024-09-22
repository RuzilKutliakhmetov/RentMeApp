import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
	Storage,
} from 'react-native-appwrite'

export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.ReactNativeProject.RentMe',
	projectId: '66a620760029715ab40b',
	databaseId: '66a62164003c58a5bc65',
	usersCollectionId: '66a6218e001b6dc2b98e',
	itemsCollectionId: '66a621c00028ddbcc7e6',
	categoriesCollectionId: '66a621d800077dd58ef8',
	favoritesItemsCollectionId: '66a621fa002a5a8e0f36',
	paymentsCollectionId: '66a6220b0004bf5bbaa2',
	imagesCollectionId: '66a62216003acd011e2d',
	reviewsCollectionId: '66a62226002303e2103f',
	rentalsCollectionId: '66a622380021d2a72827',
	imagesStorageId: '66a62710000c9de72c32',
}

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	usersCollectionId,
	categoriesCollectionId,
	itemsCollectionId,
	favoritesItemsCollectionId,
	paymentsCollectionId,
	imagesCollectionId,
	reviewsCollectionId,
	rentalsCollectionId,
	imagesStorageId,
} = config

const client = new Client()

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform)

const account = new Account(client)
const storage = new Storage(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

// Register user
export async function createUser(user) {
	try {
		const username = user.first_name + ' ' + user.last_name
		const newAccount = await account.create(
			ID.unique(),
			user.email,
			user.password,
			username
		)
		if (!newAccount) throw Error
		const avatarUrl = avatars.getInitials(username)

		await signIn(user.email, user.password)

		const newUser = await databases.createDocument(
			databaseId,
			usersCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: user.email,
				password: user.password,
				first_name: user.first_name,
				last_name: user.last_name,
				avatar: avatarUrl,
				phone_number: user.phone_number,
				role: 'user',
			}
		)
		return newUser
	} catch (error) {
		throw new Error(error)
	}
}

// Sign In
export async function signIn(email, password) {
	try {
		const session = await account.createEmailPasswordSession(email, password)
		return session
	} catch (error) {
		throw new Error(error)
	}
}

// Get Account
export async function getAccount() {
	try {
		const currentAccount = await account.get()

		return currentAccount
	} catch (error) {
		throw new Error(error)
	}
}

export async function getCurrentUser() {
	try {
		const currentAccount = await getAccount()

		if (!currentAccount) throw Error

		const currentUser = await databases.listDocuments(
			databaseId,
			usersCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		)

		if (!currentUser) throw Error

		return currentUser.documents[0]
	} catch (error) {
		throw new Error(error)
		return null
	}
}

export async function signOut() {
	try {
		const session = await account.deleteSession('current')
		return session
	} catch (error) {
		throw new Error(error)
	}
}

export async function getAllItems() {
	try {
		const items = await databases.listDocuments(databaseId, itemsCollectionId, [
			Query.orderDesc('$createdAt'),
			Query.equal('published', true),
		])
		return items.documents
	} catch (error) {
		throw new Error(error)
	}
}

export async function getAllCategories() {
	try {
		const categories = await databases.listDocuments(
			databaseId,
			categoriesCollectionId,
			[Query.orderDesc('title')]
		)
		return categories.documents
	} catch (error) {
		throw new Error(error)
	}
}

export async function getParentCategories() {
	try {
		const categories = await databases.listDocuments(
			databaseId,
			categoriesCollectionId,
			[Query.isNull('parent_category')]
		)
		return categories.documents
	} catch (error) {
		throw new Error(error)
	}
}

export async function getChildCategory(parentCategoryId) {
	try {
		const categories = await databases.listDocuments(
			databaseId,
			categoriesCollectionId,
			[Query.equal('parent_category', parentCategoryId)]
		)
		return categories.documents
	} catch (error) {
		throw new Error(error)
	}
}

export async function getCategoryById(categoryId) {
	try {
		const categories = await databases.listDocuments(
			databaseId,
			categoriesCollectionId,
			[Query.equal('$id', categoryId)]
		)
		return categories.documents[0]
	} catch (error) {
		throw new Error(error)
	}
}

export async function GetItem(itemId) {
	try {
		const item = await databases.listDocuments(databaseId, itemsCollectionId, [
			Query.equal('$id', itemId),
		])
		return item.documents[0]
	} catch (error) {
		throw new Error(error)
	}
}

async function resizeImage(width, height) {
	const isWidthGreater = width > height
	let newWidth = width
	let newHeight = height
	if (isWidthGreater) {
		newHeight = width * (3 / 4)
	} else {
		newWidth = height * (4 / 3)
	}
	if (newWidth > 1280) {
		newWidth = 1280
		newHeight = newWidth * (3 / 4)
	}
	if (newHeight > 900) {
		newHeight = 900
		newWidth = newHeight * (4 / 3)
	}
	return { width: newWidth, height: newHeight }
}

// Get File Preview
export async function getFilePreview(fileId, fileInfo, type) {
	let fileUrl

	try {
		if (type === 'video') {
			fileUrl = storage.getFileView(imagesStorageId, fileId)
		} else if (type === 'image') {
			const newDimensions = await resizeImage(fileInfo.width, fileInfo.height)
			fileUrl = storage.getFilePreview(
				imagesStorageId,
				fileId,
				newDimensions.width,
				newDimensions.height,
				'center',
				100
			)
		} else {
			throw new Error('Invalid file type')
		}

		if (!fileUrl) throw Error

		return fileUrl
	} catch (error) {
		throw new Error(error)
	}
}

// Upload File
export async function uploadFile(file, type) {
	if (!file) return

	const asset = {
		name: file.fileName,
		type: file.mimeType,
		size: file.fileSize,
		uri: file.uri,
	}

	try {
		const uploadedFile = await storage.createFile(
			imagesStorageId,
			ID.unique(),
			asset
		)
		const fileUrl = await getFilePreview(uploadedFile.$id, file, type)
		return fileUrl
	} catch (error) {
		throw new Error(error)
	}
}

// Create Image
export async function createImage(url) {
	try {
		const newImage = await databases.createDocument(
			databaseId,
			imagesCollectionId,
			ID.unique(),
			{ url: url }
		)

		if (!newImage) throw Error
		return newImage
	} catch (error) {}
}

// Create Item
export async function createItem(form) {
	try {
		// Используем Promise.all для одновременной загрузки изображений
		const imagesUrl = await Promise.all(
			form.images.map(async formImage => {
				return await uploadFile(formImage, 'image')
			})
		)
		const imagesObjects = await Promise.all(
			imagesUrl.map(async imageURL => {
				return await createImage(imageURL)
			})
		)
		const newItem = await databases.createDocument(
			databaseId,
			itemsCollectionId,
			ID.unique(),
			{
				title: form.title,
				description: form.description,
				price_per_day: form.price_per_day,
				availability: form.availability,
				obtain_method: form.obtain_method,
			}
		)

		const updateItem = await databases.updateDocument(
			databaseId,
			itemsCollectionId,
			newItem.$id,
			{ owner: form.owner, images: imagesObjects, category: form.category }
		)

		return updateItem
	} catch (error) {
		throw new Error(error)
	}
}

export async function getUserItems(userId) {
	try {
		const items = await databases.listDocuments(databaseId, itemsCollectionId, [
			Query.equal('owner', userId),
		])
		return items.documents
	} catch (error) {
		throw new Error(error)
	}
}

export async function getUsersSuggestedItems() {
	try {
		const items = await databases.listDocuments(databaseId, itemsCollectionId, [
			Query.equal('published', false),
			Query.orderDesc('$createdAt'),
		])
		return items.documents
	} catch (error) {
		throw new Error(error)
	}
}

export async function publishSuggestedItems(item) {
	try {
		const result = await databases.updateDocument(
			databaseId,
			itemsCollectionId,
			item.$id,
			{ published: true }
		)
	} catch (error) {
		throw new Error(error)
	}
}

export async function getSearchItems(filter) {
	try {
		let query = []
		if (filter.category) query.push(Query.equal('category', filter.category))
		if (filter.obtainMethod)
			query.push(Query.equal('obtain_method', filter.obtainMethod))
		if (filter.price_from && filter.price_to)
			query.push(
				Query.between('price_per_day', filter.price_from, filter.price_to)
			)
		else if (filter.price_from)
			query.push(Query.greaterThan('price_per_day', filter.price_from))
		else if (filter.price_to)
			query.push(Query.lessThan('price_per_day', filter.price_to))
		if (filter.sorted) {
			if (filter.sorted === 'chip') query.push(Query.orderAsc('price_per_day'))
			if (filter.sorted === 'rich') query.push(Query.orderDesc('price_per_day'))
			if (filter.sorted === 'new') query.push(Query.orderDesc('$createdAt'))
		}

		const items = await databases.listDocuments(
			databaseId,
			itemsCollectionId,
			query
		)
		return items.documents
	} catch (error) {
		throw new Error(error)
	}
}

export async function getUserFavoritesItems(user) {
	console.log('test')
	try {
		const items = await databases.listDocuments(
			databaseId,
			favoritesItemsCollectionId,
			[Query.equal('userId', user.$id)]
		)
		console.log(items)
		if (items.total > 0) {
			console.log('tes')
			return items.documents[0].items
		}
	} catch (error) {
		throw new Error(error)
	}
}

// Search item on favorites collection
export async function SearchUserFavoritesItem(userId) {
	try {
		const items = await databases.listDocuments(
			databaseId,
			favoritesItemsCollectionId,
			[Query.equal('userId', userId)]
		)
		if (items.total > 0) return items.documents[0]
		else return null
	} catch (error) {
		throw new Error(error)
	}
}

export async function SearchItemOnUserFavoritesList(userId, itemId) {
	const items = await SearchUserFavoritesItem(userId)
	if (items.items.filter(item => item.$id == itemId).length > 0) return true
	else return false
}

export async function CreateUserFavoritesListItem(userId) {
	try {
		const newFavoriteListItem = await databases.createDocument(
			databaseId,
			favoritesItemsCollectionId,
			ID.unique(),
			{ userId: userId }
		)
		return newFavoriteListItem
	} catch (error) {
		throw new Error(error)
	}
}

export async function ChangeItemLikes(itemObj, operation) {
	try {
		let changedLikes = 0
		if (operation === 'add') changedLikes = itemObj.likes + 1
		if (operation === 'delete') changedLikes = itemObj.likes - 1
		const updatedPost = await databases.updateDocument(
			databaseId,
			itemsCollectionId,
			itemObj.$id,
			{ likes: changedLikes }
		)
		return updatedPost
	} catch (error) {
		throw new Error(error)
	}
}

export async function getItemById(itemId) {
	const posts = await databases.listDocuments(databaseId, itemsCollectionId, [
		Query.equal('$id', itemId),
	])
	return posts.documents[0]
}

// Change item to favorites
export async function ChangeItemToFavorites(userId, itemObj) {
	try {
		let tempItem = null
		let isFavorite = false
		let posts = await SearchUserFavoritesItem(userId)
		if (!posts) posts = await CreateUserFavoritesListItem(userId)
		console.log(posts)
		if (posts.items.length > 0)
			posts.items.map(item => {
				if (item.$id === itemObj.$id) {
					tempItem = item
				}
			})
		if (tempItem) {
			posts.items = posts.items.filter(postItem => postItem.$id !== itemObj.$id)
			await ChangeItemLikes(tempItem, 'delete')
			isFavorite = false
		} else {
			posts.items.push(
				await ChangeItemLikes(await getItemById(itemObj.$id), 'add')
			)
			isFavorite = true
		}
		console.log()
		await updateItemFromFavoritesListItems(posts)
		return isFavorite
	} catch (error) {
		throw new Error(error)
	}
}

export async function updateItemFromFavoritesListItems(post) {
	try {
		const updatedPost = await databases.updateDocument(
			databaseId,
			favoritesItemsCollectionId,
			post.$id,
			{ items: post.items }
		)
	} catch (error) {
		throw new Error(error)
	}
}
