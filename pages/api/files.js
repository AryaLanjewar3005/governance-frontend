import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({ pinataJWTKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZjQzOTdiZS1lNGM1LTRhYmItOTg2Yy1mNDAxMGRhZTE5Y2YiLCJlbWFpbCI6Im1vaGl0bWVlbmExNTA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4YmY2YjJiZjQzMDczODNlOTE5MCIsInNjb3BlZEtleVNlY3JldCI6IjhhYzc1YzJlZGFhNGY2ODFhZGE0MDNiMDE3MWE0ZTQzZDcxOGU0MmQ5ZTM5MDVhMDBmMzc5YTZhNTg3NmViMzIiLCJpYXQiOjE2OTk5NjUwODZ9.jhCfTHtZWsi1y01ThUC5jx4QWIS4KJdsuVn0tuqIGNw' });

export const config = {
    api: {
        bodyParser: false,
    },
};

const saveFile = async (file) => {
    try {
        const stream = fs.createReadStream(file.filepath);
        const options = {
            pinataMetadata: {
                name: file.originalFilename,
            },
        };
        const response = await pinata.pinFileToIPFS(stream, options);
        fs.unlinkSync(file.filepath);

        return response;
    } catch (error) {
        throw error;
    }
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const form = new formidable.IncomingForm();
            form.parse(req, async function (err, fields, files) {
                if (err) {
                    console.log({ err });
                    return res.status(500).send("Upload Error");
                }
                const response = await saveFile(files.file);
                const { IpfsHash } = response;

                return res.send(IpfsHash);
            });
        } catch (e) {
            console.log(e);
            res.status(500).send("Server Error");
        }
    } else if (req.method === "GET") {
        try {
            const response = await pinata.pinList(
                { pinataJWTKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZjQzOTdiZS1lNGM1LTRhYmItOTg2Yy1mNDAxMGRhZTE5Y2YiLCJlbWFpbCI6Im1vaGl0bWVlbmExNTA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4YmY2YjJiZjQzMDczODNlOTE5MCIsInNjb3BlZEtleVNlY3JldCI6IjhhYzc1YzJlZGFhNGY2ODFhZGE0MDNiMDE3MWE0ZTQzZDcxOGU0MmQ5ZTM5MDVhMDBmMzc5YTZhNTg3NmViMzIiLCJpYXQiOjE2OTk5NjUwODZ9.jhCfTHtZWsi1y01ThUC5jx4QWIS4KJdsuVn0tuqIGNw' },
                {
                    pageLimit: 1,
                }
            );
            res.json(response.rows[0]);
        } catch (e) {
            console.log(e);
            res.status(500).send("Server Error");
        }
    }
}

