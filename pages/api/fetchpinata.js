import axios from "axios";
import mime from 'mime';

const pinataApiKey = '8bf6b2bf4307383e9190';
const pinataSecretApiKey = '8ac75c2edaa4f681ada403b0171a4e43d718e42d9e3905a00f379a6a5876eb32';
const pinataBaseUrl = 'https://gateway.pinata.cloud';

// API Key: 8bf6b2bf4307383e9190
//API Secret: 8ac75c2edaa4f681ada403b0171a4e43d718e42d9e3905a00f379a6a5876eb32
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZjQzOTdiZS1lNGM1LTRhYmItOTg2Yy1mNDAxMGRhZTE5Y2YiLCJlbWFpbCI6Im1vaGl0bWVlbmExNTA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4YmY2YjJiZjQzMDczODNlOTE5MCIsInNjb3BlZEtleVNlY3JldCI6IjhhYzc1YzJlZGFhNGY2ODFhZGE0MDNiMDE3MWE0ZTQzZDcxOGU0MmQ5ZTM5MDVhMDBmMzc5YTZhNTg3NmViMzIiLCJpYXQiOjE2OTk5NjUwODZ9.jhCfTHtZWsi1y01ThUC5jx4QWIS4KJdsuVn0tuqIGNw'

export default async function fetchDataFromPinata(req, res) {
    // async function fetchDataFromPinata(pinataHash) {
    const pinataHash = 'Qmc2S4YSx9YieTF4g52BkJPYib77vUMMhUk2ivu73iUYzP';
    try {
        const response = await axios.get(`${pinataBaseUrl}/ipfs/${pinataHash}?stream=true`, {
            headers: {
                //"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZjQzOTdiZS1lNGM1LTRhYmItOTg2Yy1mNDAxMGRhZTE5Y2YiLCJlbWFpbCI6Im1vaGl0bWVlbmExNTA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxZTEzODg1ZWUwZjEyNzZlNDBiYyIsInNjb3BlZEtleVNlY3JldCI6IjQ2OTBiNTc0ODNhNjMzZjIxMjhmOWQ1NzU3MDdkODg0YmMyY2ZmMzg4M2EwNTkwMWNmMDQ4MTE0NmZjZDEzMjkiLCJpYXQiOjE2OTk5NTk4NzR9.QrgqlgRjjmbK4IrESpRaBF4Bybyq8MJcwS3pyNWkk2Y"
                // 'pinata_api_key': pinataApiKey,
                // 'pinata_secret_api_key': pinataSecretApiKey,
                //'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`,
                // 'Content-Type': 'text/html; charset=utf-8'



            },
        });

        // const responseBlob = await response.blob()
        // const img = document.createElement('img')
        // img.src = URL.createObjectURL(responseBlob)
        // document.querySelector(`body`).append(img)

        // const extension = mime.extension(res.headers.get('content-type'))
        // const blob = await res.blob();

        // console.log(blob)

        if (response.status === 200) {
            const data = response.data;
            console.log('Fetched data from Pinata:', data);
            res.status(200).json(data);
            // return data;
        } else {
            console.error('Failed to fetch data from Pinata:', response.statusText);
            res.status(404).json({ message: 'Not Found' });
            // return null;
        }
    } catch (error) {
        console.error('Error fetching data from Pinata:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
        // return null;
    }
}

// Replace 'your-pinata-hash' with the actual IPFS hash you want to fetch
// const pinataHash = 'QmQeaQQ5rq6xLd767kZZ5zfVDGEdUts1EoUBR7BsJYuZBA';

// fetchDataFromPinata(pinataHash);
