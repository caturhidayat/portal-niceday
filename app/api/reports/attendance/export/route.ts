import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reports/attendance/export?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Backend API request failed');
    }

    const blob = await response.blob();
    
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=attendance-report-${startDate}-to-${endDate}.xlsx`,
      },
    });
  } catch (error) {
    console.error('Error exporting attendance data:', error);
    return NextResponse.json(
      { error: 'Failed to export attendance data' },
      { status: 500 }
    );
  }
}
