import cors from 'cors';

export default cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET','POST','PUT','DELETE'],
});