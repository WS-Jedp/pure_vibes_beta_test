<?php

namespace Database\Seeders;

use App\Models\Utils\QUESTION_TYPES;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SurveySeeder extends Seeder
{

    protected $questionSurveyAuth = [
        [
            "id" => "1",
            "type" => QUESTION_TYPES::BOOLEAN,
            "question" => "Were there any sign-up or login issues?",
        ],
        [
            "id" => "2",
            "type" => QUESTION_TYPES::RATE,
            "question" => "How would you rate the design of the sign-up and login screens?",
        ],
        [
            "id" => "3",
            "type" => QUESTION_TYPES::RATE,
            "question" => "Please rate your overall experience of the sign-up and login screens?"
        ],
    ];

    protected $questionsSurveyInterests = [
        [
            "id" => 4,
            "type" => QUESTION_TYPES::BOOLEAN,
            "question" => "Was it difficult to figure out the Dharma Wheel’s functionality?"
        ],
        [
            "id" => 5,
            "type" => QUESTION_TYPES::RATE,
            "question" => 'How would you rate the design of the Dharma Wheel "select interests" screen?'
        ],
        [
            "id" => 6,
            "type" => QUESTION_TYPES::RATE,
            "question" => 'Please rate your overall experience of the "select interests" screen.'
        ]
    ];

    protected $questionsSurveyHomeSection = [
        [
            "id" => 7,
            "type" => QUESTION_TYPES::RATE,
            "question" => "How would you rate the design of the Home Tab page?",
        ],
        [
            "id" => 8,
            "type" => QUESTION_TYPES::RATE,
            "question" => "Please rate your overall experience of the Home Tab.",
        ],
    ];

    protected $questionsSurveyBrowsingSection = [
        [
            "id" => 9,
            "type" => QUESTION_TYPES::RATE,
            "question" => 'How would you rate your experience while browsing through the "session details" screen?',
        ],
        [
            "id" => 10,
            "type" => QUESTION_TYPES::TEXT,
            "question" => "In the session description, what would you like to see more information about?",
        ],
        [
            "id" => 11,
            "type" => QUESTION_TYPES::BOOLEAN,
            "question" => 'Does the "session details" description persuade you to make a booking?',
        ],
    ];

    protected $questionsSurveyBookings = [
        [
            "id" => 12,
            "type" => QUESTION_TYPES::BOOLEAN,
            "question" => 'Would you change anything about the checkout process?',
        ],
        [
            "id" => 13,
            "type" => QUESTION_TYPES::RATE,
            "question" => "Please rate your experience while completing a booking.",
        ],
        [
            "id" => 14,
            "type" => QUESTION_TYPES::BOOLEAN,
            "question" => 'Does the "session details" description persuade you to make a booking?',
        ],
    ];

    protected $questionsSurveyOverralExperience = [
        [
            "id" => 15,
            "type" => QUESTION_TYPES::TEXT,
            "question" => 'When you navigate through the app, do you become confused at any point? If  yes, please explain.?',
        ],
        [
            "id" => 16,
            "type" => QUESTION_TYPES::TEXT,
            "question" => "Would you add any other questions to the FAQs?",
        ],
        [
            "id" => 17,
            "type" => QUESTION_TYPES::TEXT,
            "question" => "How would you describe the Dharma App using your own words?",
        ],
        [
            "id" => 18,
            "type" => QUESTION_TYPES::TEXT,
            "question" => "If you had a magic wand, what would you change about the app?",
        ],
        [
            "id" => 19,
            "type" => QUESTION_TYPES::TEXT,
            "question" => "Would you recommend the app to a friend?",
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
                "name" => "Sign-Up & Login",
                "questions" => json_encode($this->questionSurveyAuth),
                "amount_of_images" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => "Dharma Wheel (select interests)",
                "questions" => json_encode($this->questionsSurveyInterests),
                "amount_of_images" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => "Home Tab",
                "questions" => json_encode($this->questionsSurveyHomeSection),
                "amount_of_images" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => "Session Browsing",
                "questions" => json_encode($this->questionsSurveyBrowsingSection),
                "amount_of_images" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => "Bookings",
                "questions" => json_encode($this->questionsSurveyBrowsingSection),
                "amount_of_images" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => "Overall App Experience",
                "questions" => json_encode($this->questionsSurveyBrowsingSection),
                "amount_of_images" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ]);
    }
}
