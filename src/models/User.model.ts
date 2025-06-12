import {UserInterface} from '@/types/global-types';
import {model, models, Schema} from 'mongoose';

const userSchema = new Schema<UserInterface>(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    location: {type: String, required: true},

    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
  },
  {timestamps: true}
);

const User = models.User || model<UserInterface>('User', userSchema);
export default User;
