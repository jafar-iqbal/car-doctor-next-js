import { connectDB } from "@/lib/connect.DB"


export const GET = async (req, {params}) => {
    const db = await connectDB();
    const servicesCollection = db.collection('services');
    try {
        const service = await servicesCollection.findOne({_id:params.id});
        return Response.json({service})
    } catch (error) {
console.log(error.message);
    }
}