<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;

class WorldClockController extends Controller
{
    /**
     * Display current time for multiple cities.
     */
    public function index()
    {
        $cities = [
            [
                'city' => 'Ahmedabad',
                'country' => 'India',
                'timezone' => 'Asia/Kolkata',
                'flag' => '🇮🇳',
            ],
            [
                'city' => 'London',
                'country' => 'United Kingdom',
                'timezone' => 'Europe/London',
                'flag' => '🇬🇧',
            ],
            [
                'city' => 'New York',
                'country' => 'United States',
                'timezone' => 'America/New_York',
                'flag' => '🇺🇸',
            ],
            [
                'city' => 'Dubai',
                'country' => 'United Arab Emirates',
                'timezone' => 'Asia/Dubai',
                'flag' => '🇦🇪',
            ],
            [
                'city' => 'Tokyo',
                'country' => 'Japan',
                'timezone' => 'Asia/Tokyo',
                'flag' => '🇯🇵',
            ],
            [
                'city' => 'Sydney',
                'country' => 'Australia',
                'timezone' => 'Australia/Sydney',
                'flag' => '🇦🇺',
            ],
        ];

        $istNow = Carbon::now('Asia/Kolkata');

        $worldClocks = [];

        foreach ($cities as $city) {

            $dateTime = Carbon::now($city['timezone']);

            $difference = $istNow->diffInHours($dateTime, false);

            $worldClocks[] = [

                'city' => $city['city'],

                'country' => $city['country'],

                'flag' => $city['flag'],

                'timezone' => $city['timezone'],

                'date' => $dateTime->format('d M Y'),

                'day' => $dateTime->format('l'),

                'time24' => $dateTime->format('H:i:s'),

                'time12' => $dateTime->format('h:i:s A'),

                'offset_from_ist' => $difference == 0
                    ? 'Same as IST'
                    : ($difference > 0
                        ? '+' . $difference . ' hrs'
                        : $difference . ' hrs'),

                'is_day' => $dateTime->hour >= 6 && $dateTime->hour < 18,

                'icon' => $dateTime->hour >= 6 && $dateTime->hour < 18
                    ? '☀️'
                    : '🌙',
            ];
        }

        return response()->json([
            'success' => true,
            'updated_at' => now()->format('d-m-Y H:i:s'),
            'data' => $worldClocks,
        ]);
    }
}