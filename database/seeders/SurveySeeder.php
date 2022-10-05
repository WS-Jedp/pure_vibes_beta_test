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
            "id" => 1,
            "type" => QUESTION_TYPES::TEXT,
            "question" => "Were there any sign-up or login issues? If yes, please briefly explain why!",
            "image" => ["sign-up.jpeg", "login.jpeg"],
        ],
        [
            "id" => 2,
            "type" => QUESTION_TYPES::RATE,
            "question" => "How would you rate the design of the sign-up and login screens?",
            "image" => ["sign-up.jpeg", "login.jpeg"],
        ],
        [
            "id" => 3,
            "type" => QUESTION_TYPES::RATE,
            "question" => "Please rate your overall experience of the sign-up and login screens?",
            "image" => ["sign-up.jpeg", "login.jpeg"],
        ],
    ];

    protected $questionsSurveyInterests = [
        [
            "id" => 4,
            "type" => QUESTION_TYPES::BOOLEAN,
            "question" => "Was it difficult to figure out the Dharma Wheel’s functionality?",
            "image" => ["dharma-wheel.jpeg", "dharma-wheel-2.jpeg"],
        ],
        [
            "id" => 5,
            "type" => QUESTION_TYPES::RATE,
            "question" => 'How would you rate the design of the Dharma Wheel "select interests" screen?',
            "image" => ["dharma-wheel.jpeg", "dharma-wheel-2.jpeg"],
        ],
        [
            "id" => 6,
            "type" => QUESTION_TYPES::RATE,
            "question" => 'Please rate your overall experience of the "select interests" screen.',
            "image" => ["dharma-wheel.jpeg", "dharma-wheel-2.jpeg"],
        ]
    ];

    protected $questionsSurveyHomeSection = [
        [
            "id" => 7,
            "type" => QUESTION_TYPES::RATE,
            "question" => "How would you rate the design of the Home Tab page?",
            "image" => ["home.jpeg"],
        ],
        [
            "id" => 8,
            "type" => QUESTION_TYPES::RATE,
            "question" => "Please rate your overall experience of the Home Tab.",
            "image" => ["home.jpeg"],
        ],
    ];

    protected $questionsSurveyBrowsingSection = [
        [
            "id" => 9,
            "type" => QUESTION_TYPES::TEXT,
            "question" => 'Were you able to see all pictures and did they load correctly?',
            "image" => ["browsing.jpeg"],
        ],
        [
            "id" => 10,
            "type" => QUESTION_TYPES::TEXT,
            "question" => "Does the session description provide enough details, and does it entice you?",
            "image" => ["browsing-description.jpeg"],
        ],
        [
            "id" => 11,
            "type" => QUESTION_TYPES::RATE,
            "question" => 'How would you rate your experience while browsing through the "session details" screen?',
            "image" => [],
        ],
        [
            "id" => 12,
            "type" => QUESTION_TYPES::TEXT,
            "question" => 'Does the "session details" description persuade you to make a booking?',
            "image" => ["browsing-description.jpeg"],
        ],

    ];

    // TODO: Payment Gateway screenshots in 2nd round of beta tests
    protected $questionsSurveyBookings = [
        [
            "id" => 13,
            "type" => QUESTION_TYPES::TEXT,
            "question" => 'Would you change anything about the checkout process?',
            "image" => ["survey-bookings.jpeg", "survey-bookings-2.jpeg", "survey-bookings-3.jpeg", "survey-bookings-4.jpeg"],
        ],
        [
            "id" => 14,
            "type" => QUESTION_TYPES::TEXT,
            "question" => 'Does the cancellation policy confuse at any point, if so how would you clear it up?',
            "image" => ["survey-booking-cancellation.jpeg", "survey-booking-cancellation-2.jpeg", "survey-booking-cancellation-3.jpeg"],
        ],
        [
            "id" => 15,
            "type" => QUESTION_TYPES::TEXT,
            "question" => "Does the cancellation policy seem fair?",
            "image" => ["survey-bookings.jpeg", "survey-bookings-2.jpeg", "survey-bookings-3.jpeg", "survey-bookings-4.jpeg"],
        ],
        [
            "id" => 16,
            "type" => QUESTION_TYPES::RATE,
            "question" => "Please rate your experience while completing a booking?",
            "image" => ["survey-bookings.jpeg", "survey-bookings-2.jpeg", "survey-bookings-3.jpeg", "survey-bookings-4.jpeg"],
        ],
    ];

    protected $questionsSurveyOverralExperience = [
        [
            "id" => 17,
            "type" => QUESTION_TYPES::TEXT,
            "question" => 'When you navigate through the app, do you become confused at any point? If  yes, please explain?',
            "image" => [],
        ],
        [
            "id" => 18,
            "type" => QUESTION_TYPES::TEXT,
            "question" => "Would you add any other questions to the FAQs?",
            "image" => [],
        ],
        [
            "id" => 19,
            "type" => QUESTION_TYPES::TEXT,
            "question" => "How would you describe the Dharma App using your own words?",
            "image" => [],
        ],
        [
            "id" => 21,
            "type" => QUESTION_TYPES::TEXT,
            "question" => "If you had a magic wand, what would you change about the app?",
            "image" => [],
        ],
        [
            "id" => 22,
            "type" => QUESTION_TYPES::TEXT,
            "question" => "Do you feel like a key element is missing in the App?",
            "image" => [],
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
                "amount_of_images" => 2,
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
                "questions" => json_encode($this->questionsSurveyBookings),
                "amount_of_images" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => "Overall App Experience",
                "questions" => json_encode($this->questionsSurveyOverralExperience),
                "amount_of_images" => 3,
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ]);
    }
}
