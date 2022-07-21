<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResultsSeeder extends Seeder
{

    protected $answersMock = [
        [
            "question_id" => 1,
            "answer" => true,
            "text" => "All good",
        ],
        [
            "question_id" => 2,
            "answer" => 3,
        ],
        [
            "question_id" => 3,
            "answer" => 5,
        ],
    ];
    protected $answersMock1V2 = [
        [
            "question_id" => 1,
            "answer" => false,
            "text" => "All good",
        ],
        [
            "question_id" => 2,
            "answer" => 5,
        ],
        [
            "question_id" => 3,
            "answer" => 4,
        ],
    ];

    protected $answersMock2 = [
        [
            "question_id" => 1,
            "answer" => true,
        ],
        [
            "question_id" => 2,
            "answer" => 5,
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('results')->insert([
            [
                "answers" => json_encode($this->answersMock),
                "survey_id" => 1,
                "user_id" => 1,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "answers" => json_encode($this->answersMock2),
                "survey_id" => 2,
                "user_id" => 1,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "answers" => json_encode($this->answersMock),
                "survey_id" => 2,
                "user_id" => 1,
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ]);
    }
}
