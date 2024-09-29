<?php

namespace App\Repositories\Setting;

use App\Models\setting;

class SettingRepositoryInterfaceHandler implements SettingRepositoryInterface
{
    public function updateSetting($data){
        // dd($data);
        $setting = Setting::first();

        if (!$setting) {
        return response()->json(['message' => 'Setting not found'], 404);
    }
        $setting->organization_name = $data["organizationName"];
        $setting->organization_short_name = $data["organizationShortName"];
        $setting->slogan = $data["slogan"];
        $setting->address = $data["address"];
        $setting->hr_email = $data["hrEmail"];
        $setting->customer_support_email = $data["customerSupportEmail"];
        $setting->technical_support_email = $data["technicalSupportEmail"];
        $setting->fax = $data["fax"];
        $setting->hr_contact = $data["hrContact"];
        $setting->customer_support_contact= $data["customerSupportContact"];
        $setting->technical_support_contact= $data["technicalSupportContact"];
        $setting->office_hour= $data["officeHour"];
        $setting->facebook_page= $data["facebookPage"];
        $setting->messenger_link= $data["messengerLink"];
        $setting->youtube_url= $data["youtubeUrl"];
        $setting->featured_video_url= $data["featuredVideoUrl"];
        $setting->website= $data["website"];

        return $setting->save();
    }
    public function getSetting(){
        $setting = Setting::first();
        return $setting;
    }
}
