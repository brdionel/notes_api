import bcrypt from "bcrypt";
import mongoose from "mongoose";
import generarJWT from "../../helpers/generarJWT.js";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true 
  },
}, {
    timestamps: true
});

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) {
      next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comprobarPassword = async function(passwordFormulario) { 
  return await bcrypt.compare(passwordFormulario, this.password);
}

const User = mongoose.model("User", userSchema)

export class UserModel {
  static async create(input) {
    const { email } = input.data;

    const existeUsuario = await User.findOne({ email });
    
    if(existeUsuario) {
      const error = new Error("Usuario ya registrado");
      return {error: true, message: error.message};
    }

    try {
      const user = new User(input.data);
      const userSaved = await user.save();
      return userSaved;
    } catch(error) {
        console.log(error)
    }

  }

  static async getAll({ email }) {

    try {
      if(email) {
        const existeUsuario = await User.findOne({ email }).select("-password");
        if(!existeUsuario) {
          const error = new Error("No existe usuario con ese email");
          return {error: true, message: error.message};
        } else {
          return existeUsuario;
        }
      }
  
      const users = await User.find().select("-password");
      return users;
    } catch(error) {
      console.log({error})
    }

  }

  static async getById(id) {

    try {
      const existeUsuario = await User.findById(id).select("-password");
      if(!existeUsuario) {
        const error = new Error("No existe usuario con ese ID");
          return {error: true, message: error.message};
      }
      return existeUsuario;
    } catch(error) {
      console.log(error)
    }
  }

  static async login(input) {
    console.log({input})
    const { email } = input.data;
    try {
      const usuario = await User.findOne({ email });
  
      if(!usuario) {
        const error = new Error("El Usuario no existe");
        return {
          error: true,
          message: error.message
        }
      }

      const { password } = input.data;
      if( await usuario.comprobarPassword(password)) {
        return({
          success: true, 
          user: {
            email,
            token: generarJWT(usuario.id) 
          }
        })
      } else {
        const error = new Error("El password es incorrecto");
        return ({ error: true, message: error.message })    
      }
    } catch(error) {
      console.log(error)
    }

  }

  static async update(id, input) {
    console.log("update desde UserModel")
  }

  static async delete(id) {
    console.log("delete desde UserModel")
  }
}
