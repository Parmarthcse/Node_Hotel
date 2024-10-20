const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    age:{
         type:Number,
    },
work:{
    type:  String,
    enum:['chef', 'waiter', 'mananger'],
    required: true,
},
mobile:{
    type: String,

},
email:{
type: String,
required: true,
unique: true,
},
address:{
    type: String,
    required: true,
},
username:{
    required:true,
    type:String,
},
password:{
required:true,
type:String
}
})
personSchema.pre('save', async function(next){
    const person = this;
    //hash the password only if it has been modified (or it new)
    //false ka ulta true hoga
    if(!person.isModified('password')) return next();
try {
 //hash password generation
//means how much long number the will generate 
 const salt = await bcrypt.genSalt(10)


 //hash paasowrd
 const hashedPassword = await bcrypt.hash(person.password,salt);

 //override the plain password with the hashed one 
 person.password = hashedPassword;
    next()
} catch (error) {
   return next(err)
}
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        //use bcyrpt to compapre the provided password with the hashed password

        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}
const Person = mongoose.model('Person', personSchema);
module.exports = Person;