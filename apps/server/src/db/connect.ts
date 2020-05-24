import { connect as mongooseConnect } from 'mongoose';

export default function dbConnect(): Promise<typeof import('mongoose')> {
  const url = process.env.DB_URL;
  if (!url) {
    throw new Error('MongoDB URL must be setup as env variable `DB_URL`');
  }

  return mongooseConnect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
