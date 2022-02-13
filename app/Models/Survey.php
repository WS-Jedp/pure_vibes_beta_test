<?php

namespace App\Models;

use Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'questions'];

    public $casts = [
        'questions' => 'array'
    ];

    public function results() {
        return $this->hasMany(Result::class, 'survey_id', 'id');
    }

    public function amount_of_questions(): int
    {
        return count($this->questions);
    }
}
