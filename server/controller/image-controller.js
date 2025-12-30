import mongoose from 'mongoose';

let gfs;
const conn = mongoose.connection;

conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
});

export const uploadImage = (request, response) => {
    if (!request.file) {
        return response.status(404).json({ msg: "File not found" });
    }

    response.status(200).json({
        filename: request.file.filename
    });
};

export const getImage = async (request, response) => {
    try {
        const file = await gfs.find({ filename: request.params.filename }).toArray();

        if (!file || file.length === 0) {
            return response.status(404).json({ msg: "Image not found" });
        }

        response.set('Content-Type', file[0].contentType);
        gfs.openDownloadStreamByName(request.params.filename).pipe(response);

    } catch (error) {
        response.status(500).json(error);
    }
};
