<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminDonate extends Model
{
    use HasFactory, HasUlids;

     protected $fillable = [
        'id',
        'slug',
        'order',
        'company_name',
        'accounts_name',
        'account_number',
        'branch_name',
    ];
}
