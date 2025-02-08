import { NextResponse } from 'next/server';
import {dbConnect} from '@/lib/db';
import Promotion from '@/models/Promotion';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const id = (await params).id // 'a', 'b', or 'c'
    try {
        await dbConnect();
        const promotion = await Promotion.findById(id);
        if (!promotion) {
          return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
        }
        return NextResponse.json(promotion);
      } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch promotion' }, { status: 500 });
      }
  }

  export async function PUT(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
        
    const id = (await params).id // 'a', 'b', or 'c'
    try {
      const body = await request.json();
      await dbConnect();
      // const promotion = await Promotion.findByIdAndUpdate(id, body, {
      //   new: true,
      //   runValidators: true,
      // });
      const promotion = await Promotion.findOneAndUpdate(
        { _id: id }, 
        { $set: body }, 
        { new: true, runValidators: true }
      );
      if (!promotion) {
        return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
      }
      return NextResponse.json(promotion);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update promotion' }, { status: 500 });
    }
  }
  
  export async function DELETE(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
        const id = (await params).id // 'a', 'b', or 'c'
    try {
      await dbConnect();
      const promotion = await Promotion.findByIdAndDelete(id);
      if (!promotion) {
        return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Promotion deleted successfully' });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete promotion' }, { status: 500 });
    }
  }