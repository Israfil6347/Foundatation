<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class NoticesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // DB::table('notices')->insert([
        //     'id' => Str::uuid(),
        //     'title' => 'Important: Be careful when using email',
        //     'slug' => 'important-be-careful-when-using-email',
        //     'order' => 1,
        //     'subtitle' => 'Important: Be careful when using email',
        //     'body' => '<p><br></p><p>We from the ICT department want to inform you on an urgent basis that if you see an email from an unknown address while checking your email every day, please do not open the email.</p><p>And if you open it by mistake, do not click on any link inside the email.</p><p>Otherwise, not only you, but everyone in our network will suffer.If you receive an email from an unknown address, right click on the email and click "Forward", and forward it to ict.net@cccul.com.</p><p>thank you</p><p>Panna A. Perris</p><p>Manager, ICT</p>',
        //     'summary' => null,
        //     'button_text' => null,
        //     'button_link' => null,
        //     'attachment_url' => "http://localhost:8000/attachments/1726117782.jpg",
        //     'attachment_path' => "attachments",
        //     'attachment_name' => "1726117782.jpg",
        //     'attachment_mime' => "image/jpeg",
        //     'publish_status' => 'Draft',
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
    }
}
