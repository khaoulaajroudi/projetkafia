const mongoose = require("mongoose");
const schema = mongoose.Schema;
const UserSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar:{
    type: String,
    default:"https://static.vecteezy.com/ti/vecteur-libre/p3/6735770-belle-femme-avatar-profil-icone-vectoriel.jpg"
  }
});
module.exports = mongoose.model("user", UserSchema);
