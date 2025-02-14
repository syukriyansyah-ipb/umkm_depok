import { NextResponse } from 'next/server';
import {dbConnect} from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 }).populate('category');
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    const category = await Product.create(body);
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
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    await dbConnect();
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
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
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    await dbConnect();
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}