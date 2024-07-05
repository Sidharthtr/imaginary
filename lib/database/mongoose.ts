import mongoose, { Mongoose } from 'mongoose';

// Extract the MONGODB_URL from environment variables
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error('Missing MONGODB_URL');
}

// Function to encode the MongoDB URL properly
const getEncodedMongoUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const username = parsedUrl.username;
  const password = encodeURIComponent(parsedUrl.password);
  const host = parsedUrl.host;
  const pathname = parsedUrl.pathname;
  const searchParams = parsedUrl.searchParams.toString();

  return `mongodb+srv://${username}:${password}@${host}${pathname}?${searchParams}`;
};

// Get the encoded MongoDB URL
const encodedMongoUrl = getEncodedMongoUrl(MONGODB_URL);

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null
  };
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  cached.promise = cached.promise || mongoose.connect(encodedMongoUrl, {
    dbName: 'imaginify',
    bufferCommands: false
  });

  cached.conn = await cached.promise;

  return cached.conn;
};


