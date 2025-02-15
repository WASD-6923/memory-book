<?php

namespace App\Console\Commands\User;

use Illuminate\Console\Command;

class MakePermissionsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:make-permissions-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    protected array $rolePermissions = [
        'user' => [

        ]
    ];

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
    }
}
