import mongoose from 'mongoose';

const Connection = async () => {
    console.log("DB_URL from env:", process.env.DB_URL);

    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database', error);
    }
};

export default Connection;


