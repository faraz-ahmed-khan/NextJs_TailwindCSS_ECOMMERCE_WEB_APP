import { getSession } from 'next-auth/react';
import db from '@/utilites/db';
import Order from '@/models/Order';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).sed('signin required');
  }
  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
};

export default handler;
