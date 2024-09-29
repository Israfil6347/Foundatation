<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Service\SettingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{

    protected $settingService;

    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $settingData = $this->settingService->getSetting();
         return Inertia::render('Admin/Settings/Index', [
            'SettingData' => $settingData,
        ]);
    }
    public function update(Request $request)
    {

        $result =$this->settingService->update($request);
        // dd($result);

        if (!$result) {
            return redirect()->back()->with('error', $result['message']);
        }  

        return redirect()->route('settings.index')->with('message', "setting update successfully");

    }

    public function getPublicSetting(){

        return $this->settingService->getSetting();

    }
}
