<?php

namespace App\Console\Commands\User;

use App\Enums\User\UserStatus;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class DeleteUserAccount extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-user-account';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Удаление данных пользователей подавших заявку на удаление аккаунта';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = User::query()
            ->where('status', UserStatus::TO_DELETE)
            ->where('updated_at', '<', Carbon::now()->subWeek())
            ->get();
        foreach ($users as $user) {
            $user->update(['status' => UserStatus::DELETED, 'deleted_at' => Carbon::now()]);
            $directory = "user/$user->id";
            if (Storage::disk('public')->exists($directory)) {
                Storage::disk('public')->deleteDirectory($directory);
            }
        }
    }
}
