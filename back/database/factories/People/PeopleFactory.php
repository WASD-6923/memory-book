<?php

namespace Database\Factories\People;

use App\Enums\People\PeopleGender;
use App\Enums\People\PeopleStatus;
use App\Models\Address\Municipal;
use App\Models\People\People;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<People>
 */
class PeopleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'municipal_id' => Municipal::query()->inRandomOrder()->value('id'),
            'first_name' => fake('ru_RU')->firstName(),
            'last_name' => fake('ru_RU')->lastName(),
            'middle_name' => fake('ru_RU')->firstName(),
            'birth_date' => fake('ru_RU')->dateTimeBetween('-100 years', '-50 years'),
            'date_of_death' => fake('ru_RU')->dateTimeBetween('-50 years', '-10 years'),
            'lat' => fake()->randomFloat(8, 50, 70),
            'lon' => fake()->randomFloat(8, 50, 70),
            'birth_place' => fake('ru_RU')->city(),
            'gender' => fake('ru_RU')->randomElement([PeopleGender::MALE, PeopleGender::FEMALE]),
            'name_of_military_commissariat' => fake('ru_RU')->company(),
            'military_rank' => fake('ru_RU')->jobTitle(),
            'awards' => fake('ru_RU')->sentence(),
            'place_of_burial' => fake('ru_RU')->city(),
            'biography' => fake('ru_RU')->text(1000),
            'additional' => fake('ru_RU')->text(1000),
            'status' => fake('ru_RU')->randomElement([PeopleStatus::DRAFT, PeopleStatus::PUBLISHED]),
        ];
    }
}
