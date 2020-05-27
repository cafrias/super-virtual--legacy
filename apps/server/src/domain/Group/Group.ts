import * as mongoose from 'mongoose';
import validator from 'validator';

export interface Group extends mongoose.Document {
  name: string;
  icon: string;
}

const GroupSchema = new mongoose.Schema<Group>({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'icon is an invalid URL',
    },
  },
});

export const GroupModelName = 'Group';
const GroupModel = mongoose.model<Group>(GroupModelName, GroupSchema);

export default GroupModel;
