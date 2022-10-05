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
                "password" => Hash::make(env("DEFAULT_PASSWORD_ADMINS")),
                "role_id" => 1,
            ],
        ]);
    }
}
