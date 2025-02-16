<?php

namespace Database\Seeders;

use App\Models\Address\Municipal;
use App\Models\People\People;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PeopleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        People::factory()->count(100)->create();
    }
}
