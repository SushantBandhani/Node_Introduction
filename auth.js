const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const Person=require('./models/Person')



// Define the LocalStrategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            console.log('Received credentials');


            // Ensure to await the async operation
            const user = await Person.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'Incorrect Username' });
            }


            // Check password (Ensure password comparison logic is correct)
            const isPasswordMatch = user.password === password; // In practice, use bcrypt to compare hashed passwords
            if (isPasswordMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect Password' });
            }
        } catch (err) {
            return done(err);
        }
    }
));


module.exports=passport