<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = ['survey_id', 'user_id', 'answers'];

    protected $casts = [
        'answers' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function survey()
    {
        return $this->belongsTo(Survey::class, 'survey_id', 'id');
    }

    public function get_results_by_user(int $user_id)
    {
        return $this->all()->where('user_id', $user_id);
    }

    public function get_survey_results_by_user(int $survey_id, int $user_id)
    {
        return $this->first()->where('user_id', $user_id)->where('survey_id', $user_id);
    }
}
