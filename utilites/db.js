import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.Isconnected) {
    console.log('Already connected!');
    return;
  }
  if (mongoose.Connection.length > 0) {
    connection.Isconnected = mongoose.connections[0].readyState;
    if (connection.Isconnected === 1) {
      console.log('use pervious connection');
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log('new connection');
  connection.Isconnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.Isconnected) {
    if (process.env.NODE_ENV === 'production') await mongoose.disconnect();
    connection.Isconnected = false;
  } else {
    console.log('not disconnected');
  }
}

const db = { connect, disconnect };
export default db;
