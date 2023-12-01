import 'dotenv/config';
import { user } from './models/user.js';
import { client } from './utils/database.js';

client.sync({ force: false });