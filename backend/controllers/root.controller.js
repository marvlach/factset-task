
export const getRoot = (req, res) => {
    console.log('cookie', req.cookies)
    res.status(200).json({ message: 'Hello. I am root' });
}