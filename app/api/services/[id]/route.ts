import { NextResponse } from 'next/server';
import {dbConnect} from '@/lib/db';
import Service from '@/models/Service';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const id = (await params).id // 'a', 'b', or 'c'
    try {
        await dbConnect();
        const service = await Service.findById(id);
        if (!service) {
          return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }
        return NextResponse.json(service);
      } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
      }
  }

  export async function PUT(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
        
    const id = (await params).id // 'a', 'b', or 'c'
    try {
      const body = await request.json();
      await dbConnect();
      // const service = await Service.findByIdAndUpdate(id, body, {
      //   new: true,
      //   runValidators: true,
      // });
      const service = await Service.findOneAndUpdate(
        { _id: id }, 
        { $set: body }, 
        { new: true, runValidators: true }
      );
      if (!service) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
      }
      return NextResponse.json(service);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
  }
  
  export async function DELETE(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
        const id = (await params).id // 'a', 'b', or 'c'
    try {
      await dbConnect();
      const service = await Service.findByIdAndDelete(id);
      if (!service) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
  }