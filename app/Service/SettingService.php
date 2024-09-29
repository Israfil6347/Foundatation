<?php

namespace App\Service;

use App\Repositories\Setting\SettingRepositoryInterface;

class SettingService
{
    protected $settingRepository;

    public function __construct(SettingRepositoryInterface $settingRepositoryInterface)
    {
        $this->settingRepository = $settingRepositoryInterface;
    }

    public function update($data)
    {
        return $this->settingRepository->updateSetting(data: $data);
    }
    // public function getBySettingName() {
    //     return $this->settingRepository->getBySettingName();
    // }

    public function getSetting(){
         return $this->settingRepository->getSetting();
    }


}
