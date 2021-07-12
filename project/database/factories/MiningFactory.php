<?php

namespace Database\Factories;

use App\Models\Mining;
use Illuminate\Database\Eloquent\Factories\Factory;

class MiningFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Mining::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'company_id' => $this->faker->numberBetween(1, 20),
            'mined' => $this->faker->numberBetween(100, 10000000),
            'date_mined' => $this->faker->dateTimeBetween( '-6 month'),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
