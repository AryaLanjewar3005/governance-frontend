const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZjQzOTdiZS1lNGM1LTRhYmItOTg2Yy1mNDAxMGRhZTE5Y2YiLCJlbWFpbCI6Im1vaGl0bWVlbmExNTA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4YmY2YjJiZjQzMDczODNlOTE5MCIsInNjb3BlZEtleVNlY3JldCI6IjhhYzc1YzJlZGFhNGY2ODFhZGE0MDNiMDE3MWE0ZTQzZDcxOGU0MmQ5ZTM5MDVhMDBmMzc5YTZhNTg3NmViMzIiLCJpYXQiOjE2OTk5NjUwODZ9.jhCfTHtZWsi1y01ThUC5jx4QWIS4KJdsuVn0tuqIGNw'

export default async function pinFileToIPFS(req, res) {
    // const pinFileToIPFS = async () => {
    const formData = new FormData();
    // const src = "public/assets/song1.mp3";

    // const file = fs.createReadStream(src)
    // formData.append('file', file)

    // const file = fs.createReadStream(req.file); // Use the file passed in the request
    // formData.append('file', file);

    console.log("recevide -> ", req)

    const pinataMetadata = JSON.stringify({
        name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });
        console.log(res.data);
        res.status(200).json({ success: true, data: res.data });
    } catch (error) {
        console.log(error);
    }
}
pinFileToIPFS()
