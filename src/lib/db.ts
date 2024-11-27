// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

async function listDatabases(client: MongoClient) {
  const databasesList = await client.db().admin().listDatabases()
  console.log('Databases:')
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`))
}

async function getUser(username: string) {
  const client = await clientPromise
  const database = client.db(process.env.DB_NAME)
  const users = database.collection('users')
  const user = await users.findOne({ username })
  // Return bio field explicitly
  return user ? {
    ...user,
    _id: user._id.toString(),
    bio: user.bio || '',
    date: user.date,
    name: user.name || '',
    username: user.username,
  } : null
}

async function checkDB() {
  const client = await clientPromise
  const database = client.db()
  const databasesList = await database.admin().listDatabases()
  console.log('Databases:')
  databasesList.databases.forEach((db: { name: any }) =>
    console.log(` - ${db.name}`),
  )
}

async function updateProfilePicture(username: string, pfpLink: string) {
  const client = await clientPromise
  const db = client.db('tester')
  const users = db.collection('users')
  const user = await users.findOne({ username })
  if (user) {
    users.updateOne({ username }, { $set: { pfpLink } })
  }
}

async function getProfilePicture(username: string) {
  const client = await clientPromise
  const db = client.db('tester')
  const users = db.collection('users')
  const user = await users.findOne({ username })
  if (user) {
    if (user.pfpLink) {
      return user.pfpLink
    } 
  }
}

export default { clientPromise, getUser, checkDB, updateProfilePicture, getProfilePicture }
