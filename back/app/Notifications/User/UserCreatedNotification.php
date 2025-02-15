<?php

namespace App\Notifications\User;

use App\Models\User\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class UserCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public User|Model $user)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['broadcast','database', /*'mail'*/];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    public function toBroadCast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'id' => $this->id,
            'read_at' => null,
            'data' => [
                'modelId' => $this->user->id,
                'message' => 'Создан новый пользователь!!',
                'url' => '/admin/users/update/' . $this->user->id,
                'description' => '',
                'type' => 'UserCreatedNotification',
            ]
        ]);
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'modelId' => $this->user->id,
            'message' => 'Создан новый пользователь!!',
            'url' => '/admin/users/update/' . $this->user->id,
            'description' => '',
            'type' => 'UserCreatedNotification',
        ];
    }
}
