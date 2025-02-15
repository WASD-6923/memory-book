<?php

declare(strict_types=1);

namespace App\GraphQL\Queries\Auth;

use App\Models\User\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

final readonly class Login
{
    /** @param array{} $args
     * @throws ValidationException
     */
    public function __invoke(null $_, array $args)
    {
        $user = User::query()->where('phone', $args['input']['email'])->orWhere(
            'email',
            $args['input']['email'],
        )->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['Неверный логин или пароль.'],
            ]);
        }

        $token = auth()->login($user);

        Log::info('token ' . $token);

        return [
            'accessToken' => $token,
            'type' => 'bearer',
            'user' => Auth::user(),
        ];
    }
}
