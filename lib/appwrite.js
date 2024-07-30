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
	favoritesVideoCollectionId,
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
		console.log(error)
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
		const posts = await databases.listDocuments(databaseId, itemsCollectionId, [
			Query.orderDesc('$createdAt'),
		])
		return posts.documents
	} catch (error) {
		throw new Error(error)
	}
}

export async function getAllCategory() {
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
