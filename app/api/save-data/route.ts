import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { type, data } = await req.json();
    
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    if (type === 'apps') {
      fs.writeFileSync(path.join(dataDir, 'apps.json'), JSON.stringify(data, null, 2), 'utf8');
    } else if (type === 'blog') {
      fs.writeFileSync(path.join(dataDir, 'blog.json'), JSON.stringify(data, null, 2), 'utf8');
    } else {
       return NextResponse.json({ error: 'Invalid data type' }, { status: 400 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
