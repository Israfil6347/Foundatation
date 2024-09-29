<?php

namespace App\Repositories\Setting;

interface SettingRepositoryInterface
{
    public function updateSetting($data);

    public function getSetting();
}
