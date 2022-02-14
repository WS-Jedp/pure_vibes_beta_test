<?php

namespace Database\Seeders;

use App\Models\Utils\QUESTION_TYPES;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SurveySeeder extends Seeder
{

    protected $questionMock = [
        [
            "id" => "1",
            "type" => QUESTION_TYPES::BOOLEAN,
            "question" => "Are you good?"
        ],
        [
            "id" => "2",
            "type" => QUESTION_TYPES::RATE,
            "question" => "How you feeling?"
        ],
        [
            "id" => "3",
            "type" => QUESTION_TYPES::TEXT,
            "question" => "How are you?"
        ],
    ];

    protected $questionMock2 = [
        [
            "id" => 4,
            "type" => QUESTION_TYPES::BOOLEAN,
            "question" => "Are you ok?"
        ],
        [
            "id" => 5,
            "type" => QUESTION_TYPES::RATE,
            "question" => "How is the climate?"
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('surveys')->insert([
            [
                "name" => "Section 1",
                "questions" => json_encode($this->questionMock),
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => "Section 2",
                "questions" => json_encode($this->questionMock2),
                "created_at" => now(),
                "updated_at" => now(),
            ]
        ]);
    }
}
