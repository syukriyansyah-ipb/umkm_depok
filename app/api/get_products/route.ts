import Product from "@/libs/models/Product";
import { connectMongoDB } from "@/libs/MongoConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await connectMongoDB()

        const data = await Product.find()
        console.log(data)

        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            msg: "Something Went Wrong"
        }, 
        { status: 400 }
    );
    }
}