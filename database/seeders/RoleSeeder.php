<?php

namespace Database\Seeders;

use App\Models\Utils\ROLES;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                "name" => ROLES::ADMIN,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => ROLES::TESTER,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => ROLES::GUEST,
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ]);
    }
}
