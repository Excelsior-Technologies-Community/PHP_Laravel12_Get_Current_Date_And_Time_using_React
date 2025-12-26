<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/current-datetime', function (Request $request) {
    // Set timezone to Indian Standard Time
    $date = now()->setTimezone('Asia/Kolkata');
    
    return response()->json([
        'date' => $date->format('d-m-Y'), // Indian date format
        'time' => $date->format('H:i:s'),
        'datetime' => $date->format('d-m-Y H:i:s'),
        'timezone' => 'Asia/Kolkata',
        'timestamp' => $date->timestamp,
        'timezone_offset' => '+5:30',
        'is_daylight_saving' => false,
        'next_timezone_change' => null,
    ]);
});