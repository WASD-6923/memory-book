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
            'first_name' => fake('ru')->firstName(),
            'last_name' => fake('ru')->lastName(),
            'middle_name' => fake('ru')->firstName(),
            'birth_date' => fake('ru')->dateTimeBetween('-100 years', '-50 years'),
            'date_of_death' => fake('ru')->dateTimeBetween('-50 years', '-10 years'),
            'birth_place' => fake('ru')->city(),
            'gender' => fake('ru')->randomElement([PeopleGender::MALE, PeopleGender::FEMALE]),
            'name_of_military_commissariat' => fake('ru')->company(),
            'military_rank' => fake('ru')->jobTitle(),
            'awards' => fake('ru')->sentence(),
            'place_of_burial' => fake('ru')->city(),
            'biography' => fake('ru')->paragraph(),
            'additional' => fake('ru')->paragraph(),
            'status' => fake('ru')->randomElement([PeopleStatus::DRAFT, PeopleStatus::PUBLISHED]),
        ];
    }
}
