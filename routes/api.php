<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/current-datetime', function (Request $request) {

    $timezone = $request->get('timezone', 'Asia/Kolkata');

    try {
        $date = now()->setTimezone($timezone);
    } catch (\Exception $e) {
        $timezone = 'Asia/Kolkata';
        $date = now()->setTimezone($timezone);
    }

    return response()->json([
        'date' => $date->format('d-m-Y'),
        'day' => $date->format('l'),
        'month' => $date->format('F'),
        'year' => $date->format('Y'),
        'time24' => $date->format('H:i:s'),
        'time12' => $date->format('h:i:s A'),
        'datetime' => $date->format('d-m-Y H:i:s'),
        'timezone' => $timezone,
        'timestamp' => $date->timestamp,
    ]);
});