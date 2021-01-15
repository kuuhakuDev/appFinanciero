import mongoose from 'mongoose'

/* AccountSchema will correspond to a collection in your MongoDB database. */
const AccountSchema = new mongoose.Schema({
    userId: {
        /* The name of this account */

        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide a userId for this account.'],
        },
    name: {
        /* The name of this account */

        type: String,
        required: [true, 'Please provide a name for this account.'],
        maxlength: [25, 'Name cannot be more than 25 characters'],
    },
    saldo: {
        /* Pet's age, if applicable */

        type: Number,
        required: [true, 'Please provide a saldo for this account.'],
    },
})

export default mongoose.models.Account_Personal || mongoose.model('Account_Personal', AccountSchema)