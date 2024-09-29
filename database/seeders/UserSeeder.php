<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB; 

class UserSeeder extends Seeder
{
    function getRandomNumber()
    {
        $faker = Factory::create();
        return $faker->randomNumber();
    }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('users')->insert([
            'name' => 'John Doe',
            'phone'=> '+880-0000000',
            'email' => 'super.admin@email.com',
            'email_verified_at' => now(),
            'photo' => 'https://source.unsplash.com/random/1200x760?sig=' . $this->getRandomNumber(),
            'role' => 'Super Admin',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10),
            'status'=> '0',
        ]);
    }
}
