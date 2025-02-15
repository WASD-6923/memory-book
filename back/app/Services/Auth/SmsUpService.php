<?php

namespace App\Services\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Exceptions\HttpResponseException;

class SmsUpService {

    public function sendSms(string $phone, string $code)
    {
        $phone = preg_replace('/[+() -]/', '', $phone);

        $message = 'Your code is ' . $code .  '. You can use it to log into your account. If you did not request this message, ignore it.';
        try {
            $response = Http::post('https://api.gateway360.com/api/3.0/sms/send', [
                'api_key' => env('SMS_UP_TOKEN'),
                'concat' => 1,
                'messages' => [
                    [
                        'from' => 'Vilanova',
                        'to' => $phone,
                        'text' => $message,
                    ]
                ]
            ]);

            if ($response->failed()) {
                throw new HttpResponseException(response()->json([
                    'error' => 'Request failed',
                    'status' => $response->status(),
                ], $response->status()));
            }

            return $response->json();

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
