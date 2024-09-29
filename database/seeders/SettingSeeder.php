<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        DB::table('settings')->insert([
            'organization_name'=> '',
            'organization_short_name'=> '',
            'slogan'=> '',
            'address'=> '',
            'hr_email'=> '',
            'customer_support_email'=> '',
            'technical_support_email'=> '',
            'fax'=> '',
            'hr_contact'=> '',
            'customer_support_contact'=> '',
            'technical_support_contact'=> '',
            'office_hour'=> '',
            'facebook_page'=> '',
            'messenger_link'=> '',
            'youtube_url'=> '',
            'featured_video_url'=> '',
            'website'=> '',
        ]);
      
    }
}
