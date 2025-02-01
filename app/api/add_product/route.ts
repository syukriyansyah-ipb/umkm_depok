import Product from "@/libs/models/Product";
import { connectMongoDB } from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try{

        const body = await request.json();
        const {image, fileKey, name, category, price, description, type, isBestSeller} = body;

        await connectMongoDB()

        const data = await Product.create({
            image, 
            fileKey, 
            name, 
            category, 
            price,
            description,
            type,
            isBestSeller
        });

        return NextResponse.json({msg: "Product added successfully", data });
    } catch (error) {
        return NextResponse.json({
            error,
            msg: "Something Went Wrong"
        }, 
        { status: 400 }
    );
    }
}