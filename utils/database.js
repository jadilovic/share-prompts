import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		console.log('Mongo DB Atlas already connected!');
		return;
	}

	try {
		mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'share-prompt',
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		isConnected = true;
		console.log('Mongo DB Connected!');
	} catch (error) {
		console.log(error);
	}
};
