<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                "name" => "Juanes",
                "email" => "jedp082@gmail.com",
                "password" => Hash::make("05022001"),
                "role_id" => 1,
            ],
            [
                "name" => "Test 1",
                "email" => "test1@gmail.com",
                "password" => Hash::make("05022001"),
                "role_id" => 2,
            ],
            [
                "name" => "Test 2",
                "email" => "test2@gmail.com",
                "password" => Hash::make("05022001"),
                "role_id" => 3,
            ],
        ]);
    }
}
