import mongoose, {Schema, Document, model} from "mongoose"
import bcrypt from 'bcrypt'
export interface IUser extends Document{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  firstName:{
    type: String,
    required: true,
    trim:true
  },
  lastName:{
    type: String,
    required: true,
    trim:true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim:true,
    match: [/.+@.+\..+/, "please enter correct email"],
  },
  password:{
    type: String,
    required: true,
    match: [
      /(?=.*[0-9])(?=.*[a-zA-Z]).{8,}/,
      "password must be at least 8 characters and contain both letters and numbers",
    ],
  },
})


userSchema.pre('save', async function (this: IUser) {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10);
});


const userModel = mongoose.model('User',userSchema)

export default userModel

