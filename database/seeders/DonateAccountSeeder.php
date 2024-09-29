<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DonateAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    
        DB::table('admin_donates')->insert([
            [
                'id' => Str::uuid(), 
                'slug' => 'dhaka-credit-savings-account',
                'order' => 0,
                'company_name' => 'Dhaka Credit Savings Account',
                'accounts_name' => 'Fr. Charles J. Young Foundation',
                'account_number' => 'T-0065428',
                'branch_name' => null, 
                'publish_status' => 'Published',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'slug' => 'bank-asia-ltd',
                'order' => 0,
                'company_name' => 'Bank Asia Ltd.',
                'accounts_name' => 'Fr. Charles J. Young Foundation Accounts',
                'account_number' => '00736000877',
                'branch_name' => 'Scotia Branch (070276130)',
                'publish_status' => 'Published',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
