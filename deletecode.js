// const bcrypt = require("bcrypt");

// // Hash password before saving to database
// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//   next();
// });

// // Method to compare passwords
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };
