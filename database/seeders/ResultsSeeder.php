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
            "answer" => false,
            "text" => "All bad",
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
    protected $answersMock3 = [
        [
            "question_id" => 1,
            "answer" => 4,
        ],
        [
            "question_id" => 2,
            "answer" => 5,
        ],
    ];

    protected $answersMock4 = [
        [
            "question_id" => 1,
            "answer" => 5,

        ],
        [
            "question_id" => 2,
            "answer" => "Algo gg",
        ],
        [
            "question_id" => 3,
            "answer" => true,
        ],
    ];
    protected $answersMock5 = [
        [
            "question_id" => 1,
            "answer" => true,
        ],
        [
            "question_id" => 2,
            "answer" => 4,
        ],
        [
            "question_id" => 3,
            "answer" => true,
        ],
    ];

    protected $answersMock6 = [
        [
            "question_id" => 1,
            "answer" => "Algo 1",
        ],
        [
            "question_id" => 2,
            "answer" => "Algo 2",
        ],
        [
            "question_id" => 3,
            "answer" => "Algo 3",
        ],
        [
            "question_id" => 4,
            "answer" => "Algo 4",
        ],
        [
            "question_id" => 5,
            "answer" => "Algo 5",
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
                "answers" => json_encode($this->answersMock1V2),
                "survey_id" => 1,
                "user_id" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "answers" => json_encode($this->answersMock2),
                "survey_id" => 2,
                "user_id" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "answers" => json_encode($this->answersMock3),
                "survey_id" => 3,
                "user_id" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "answers" => json_encode($this->answersMock4),
                "survey_id" => 4,
                "user_id" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "answers" => json_encode($this->answersMock5),
                "survey_id" => 5,
                "user_id" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "answers" => json_encode($this->answersMock6),
                "survey_id" => 6,
                "user_id" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ]);
    }
}
