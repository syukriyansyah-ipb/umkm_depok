import { NextResponse } from 'next/server';
import {dbConnect} from '@/lib/db';
import Product from '@/models/Product';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const id = (await params).id // 'a', 'b', or 'c'
    try {
        await dbConnect();
        const product = await Product.findById(id);
        if (!product) {
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product);
      } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
      }
  }

  export async function PUT(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
        
    const id = (await params).id // 'a', 'b', or 'c'
    try {
      const body = await request.json();
      await dbConnect();
      // const product = await Product.findByIdAndUpdate(id, body, {
      //   new: true,
      //   runValidators: true,
      // });
      const product = await Product.findOneAndUpdate(
        { _id: id }, 
        { $set: body }, 
        { new: true, runValidators: true }
      );
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(product);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
  }
  
  export async function DELETE(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
        const id = (await params).id // 'a', 'b', or 'c'
    try {
      await dbConnect();
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
  }