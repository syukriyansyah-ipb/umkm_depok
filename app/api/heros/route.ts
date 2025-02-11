import { NextResponse } from 'next/server';
import {dbConnect} from '@/lib/db';
import Hero from '@/models/Hero';

export async function GET() {
  try {
    await dbConnect();
    const products = await Hero.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    const category = await Hero.create(body);
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

// PUT: Mengedit promosi berdasarkan ID yang diberikan dalam body
export async function PUT(req: Request) {
  try {
    const body = await req.json();  // Menerima ID dan data yang akan diupdate
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Hero ID is required' }, { status: 400 });
    }

    await dbConnect();
    const updatedHero = await Hero.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedHero) {
      return NextResponse.json({ error: 'Hero not found' }, { status: 404 });
    }

    return NextResponse.json(updatedHero);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

// DELETE: Menghapus promosi berdasarkan ID yang diberikan dalam body
export async function DELETE(req: Request) {
  try {
    const body = await req.json();  // Menerima ID dari body
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Hero ID is required' }, { status: 400 });
    }

    await dbConnect();
    const deletedHero = await Hero.findByIdAndDelete(id);

    if (!deletedHero) {
      return NextResponse.json({ error: 'Hero not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Hero deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}