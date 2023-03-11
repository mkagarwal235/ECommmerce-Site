

export default function handler(res,req)
{
 
    res.status(200).json({body: req.body })
}