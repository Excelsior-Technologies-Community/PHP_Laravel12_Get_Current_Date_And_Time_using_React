<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DateDifferenceController extends Controller
{
    /**
     * Calculate date difference.
     */
    public function calculate(Request $request)
    {
        $request->validate([
            'date' => ['required', 'date'],
        ]);

        $selectedDate = Carbon::parse($request->date)->startOfDay();
        $today = Carbon::today();

        $isFuture = $selectedDate->greaterThan($today);
        $isToday = $selectedDate->equalTo($today);
        $isPast = $selectedDate->lessThan($today);

        $diff = $today->diff($selectedDate);

        $totalDays = $today->diffInDays($selectedDate, false);

        return response()->json([
            'success' => true,

            'selected_date' => $selectedDate->format('d M Y'),

            'day' => $selectedDate->format('l'),

            'status' => $isToday
                ? 'Today'
                : ($isFuture ? 'Upcoming' : 'Past'),

            'message' => $isToday
                ? 'The selected date is today.'
                : ($isFuture
                    ? 'The selected date is in the future.'
                    : 'The selected date has already passed.'),

            'difference' => [
                'years' => $diff->y,
                'months' => $diff->m,
                'days' => $diff->d,

                'total_days' => abs($totalDays),

                'total_weeks' => floor(abs($totalDays) / 7),

                'is_future' => $isFuture,
                'is_today' => $isToday,
                'is_past' => $isPast,
            ],
        ]);
    }
}