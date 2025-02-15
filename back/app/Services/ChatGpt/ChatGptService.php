<?php

namespace App\Services\ChatGpt;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class ChatGptService
{
    protected Client $client;
    protected string $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('OPENAI_API_KEY');
    }

    /**
     * @throws GuzzleException
     */
    public function askQuestion($question)
    {
        $response = $this->client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-4o-mini',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $question,
                    ],
                ],
                'max_tokens' => 150,
                'temperature' => 1.0,
            ],
        ]);

        $data = json_decode($response->getBody()->getContents(), true);

        return $data['choices'][0]['text'];
    }
}
