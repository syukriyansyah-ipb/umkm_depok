import { NextResponse } from 'next/server';
import {dbConnect} from '@/lib/db';
import Category from '@/models/Category';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const id = (await params).id // 'a', 'b', or 'c'
    try {
        await dbConnect();
        const category = await Category.findById(id);
        if (!category) {
          return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json(category);
      } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
      }
  }

  export async function PUT(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
        
    const id = (await params).id // 'a', 'b', or 'c'
    try {
      const body = await request.json();
      await dbConnect();
      // const category = await Category.findByIdAndUpdate(id, body, {
      //   new: true,
      //   runValidators: true,
      // });
      const category = await Category.findOneAndUpdate(
        { _id: id }, 
        { $set: body }, 
        { new: true, runValidators: true }
      );
      if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      return NextResponse.json(category);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
  }
  
  export async function DELETE(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
        const id = (await params).id // 'a', 'b', or 'c'
    try {
      await dbConnect();
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
  }