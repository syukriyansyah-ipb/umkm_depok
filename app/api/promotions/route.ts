import { NextResponse } from 'next/server';
import {dbConnect} from '@/lib/db';
import Promotion from '@/models/Promotion';

export async function GET() {
  try {
    await dbConnect();
    const promotions = await Promotion.find({}).sort({ createdAt: -1 });
    return NextResponse.json(promotions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promotions' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    const promotion = await Promotion.create(body);
    return NextResponse.json(promotion);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create promotion' }, { status: 500 });
  }
}

// PUT: Mengedit promosi berdasarkan ID yang diberikan dalam body
export async function PUT(req: Request) {
  try {
    const body = await req.json();  // Menerima ID dan data yang akan diupdate
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Promotion ID is required' }, { status: 400 });
    }

    await dbConnect();
    const updatedPromotion = await Promotion.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPromotion) {
      return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPromotion);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update promotion' }, { status: 500 });
  }
}

// DELETE: Menghapus promosi berdasarkan ID yang diberikan dalam body
export async function DELETE(req: Request) {
  try {
    const body = await req.json();  // Menerima ID dari body
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Promotion ID is required' }, { status: 400 });
    }

    await dbConnect();
    const deletedPromotion = await Promotion.findByIdAndDelete(id);

    if (!deletedPromotion) {
      return NextResponse.json({ error: 'Promotion not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete promotion' }, { status: 500 });
  }
}