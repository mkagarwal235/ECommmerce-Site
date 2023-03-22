// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let pincodes =
  {
    "721302":["Kharagpur","West Bengal"],
    "110003":["Delhi","Delhi"],
    "834009":["Ranchi","Jharkhand"],
    "560017":["Bangalore","Karnataka"] 
  }
  res.status(200).json(pincodes)
}
