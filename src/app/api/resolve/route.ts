import { NextRequest, NextResponse } from 'next/server';

const TERABOX_APIS = [
    {
        name: "TeraBox API 1",
        url: "https://terabox-udayscriptsx-api.smx.workers.dev/?url="
    },
    {
        name: "TeraBox API 2",
        url: "https://terabox-phi-api.smx.workers.dev/?url="
    },
    {
        name: "TeraBox API 3",
        url: "https://terabox-teraboxx-api.smx.workers.dev/?url="
    },
    {
        name: "TeraBox API 5",
        url: "https://terabox-vercel-api.smx.workers.dev/?url="
    }
];

interface TeraBoxResponse {
    success: boolean;
    file?: {
        filename: string;
        size: string;
        thumb: string;
        proxy_link: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json(
                { error: 'TeraBox URL is required' },
                { status: 400 }
            );
        }

        // Try each API sequentially until one succeeds
        for (const api of TERABOX_APIS) {
            try {
                const response = await fetch(`${api.url}${encodeURIComponent(url)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.log(`${api.name} failed with status ${response.status}`);
                    continue;
                }

                const data: TeraBoxResponse = await response.json();

                if (data.success && data.file) {
                    return NextResponse.json({
                        success: true,
                        thumbnail: data.file.thumb,
                        filename: data.file.filename,
                        size: data.file.size,
                        downloadUrl: data.file.proxy_link,
                    });
                }
            } catch (error) {
                console.error(`${api.name} error:`, error);
                continue;
            }
        }

        return NextResponse.json(
            { error: 'All APIs failed to resolve the URL. Please try again later.' },
            { status: 500 }
        );
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
