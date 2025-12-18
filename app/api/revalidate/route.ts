import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        // Check for secret to prevent unauthorized cache purging
        const authHeader = request.headers.get('authorization')
        const secret = process.env.REVALIDATE_SECRET || 'your-secret-here'

        if (authHeader !== `Bearer ${secret}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Revalidate all critical paths
        revalidatePath('/', 'layout')
        revalidatePath('/')
        revalidatePath('/articles')
        revalidatePath('/about')
        revalidatePath('/contact')

        // Revalidate all article paths (this is a catch-all)
        revalidatePath('/[slug]')

        return NextResponse.json({
            revalidated: true,
            message: 'All paths revalidated',
            timestamp: new Date().toISOString()
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            timestamp: new Date().toISOString()
        }, { status: 500 })
    }
}

// Allow anyone to trigger a basic revalidation via GET (no auth needed for public use)
export async function GET() {
    try {
        revalidatePath('/')

        return NextResponse.json({
            message: 'Homepage revalidated',
            info: 'For full cache purge, use POST with authorization',
            timestamp: new Date().toISOString()
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}
