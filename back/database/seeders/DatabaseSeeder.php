<?php

namespace Database\Seeders;

use App\Enums\Realty\PropertyType;
use App\Models\Address\City;
use App\Models\Address\Municipal;
use App\Models\Address\Region;
use App\Models\Application\ApplicationSample;
use App\Models\Application\ApplicationSampleDocument;
use App\Models\Auction\Auction;
use App\Models\Auction\AuctionUser;
use App\Models\Group\Group;
use App\Models\Realty\Property;
use App\Models\Share\Role;
use App\Models\User\Profile;
use App\Models\User\User;
use Database\Factories\Application\ApplicationSampleDocumentFactory;
use Database\Factories\Realty\CategoryFactory;
use Database\Factories\Realty\CategoryPropertyFactory;
use Database\Factories\Realty\RealtyFactory;
use Database\Factories\Realty\RealtyPropertyFactory;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin', 'guard_name' => 'api', 'title' => 'Администратор']);
        Role::create(['name' => 'moderator', 'guard_name' => 'api', 'title' => 'Модератор']);

        $admin = User::factory()->create([
            'name' => 'kivicms',
            'email' => 'admin@memory-book.space',
            'phone' => '79010965180',
            'password' => '$2y$12$OX.AHE6rres4dlVrwbBDmexPU58cYALeZr28uiuLGkJtGBKdEs9lW', // Zc4e72xs
            'notification_email' => 'admin@memory-book.space',
            'first_name' => 'Кирилл',
            'last_name' => 'Иванов',
            'middle_name' => 'Витальевич',

        ]);
        Profile::query()->create(['user_id' => $admin->id]);

        $admin->assignRole(['admin']);

        $moderator = User::factory()->create([
            'name' => 'moderator',
            'email' => 'moderator@memory-book.space',
            'phone' => '79619379273',
            'password' => '$2y$12$OX.AHE6rres4dlVrwbBDmexPU58cYALeZr28uiuLGkJtGBKdEs9lW', // Zc4e72xs
            'notification_email' => 'moderator@memory-book.space',
            'first_name' => 'Модератор',
            'last_name' => 'Модераторов',
            'middle_name' => 'Модераторович',

        ]);

        $region = Region::query()->create(['name' => 'Оренбургская область']);
        $city = City::query()->create(['name' => 'Оренбург', 'region_id' => $region->id]);

        $this->call(MunicipalSeeder::class);
        $this->call(PeopleSeeder::class);

        $municipal = Municipal::query()->where('name', 'Оренбург')->first();
        Profile::query()->create(
            [
                'user_id' => $moderator->id,
                'local_government' => 'Орган военного управления',
                'name' => 'Оренбурский городской округ',
                'municipal_id' => $municipal->id,
            ],
        );

        $moderator->assignRole(['moderator']);


    }
}
