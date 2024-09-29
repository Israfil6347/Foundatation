<?php

namespace App\Http\Resources\Donate;
use App\Utilities\LinkObject;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class DonateCollection extends JsonResource
{

    private function getStatus()
    {
       return $this->publish_status === "Published"? new LinkObject("draft", "Make Draft", route('adminDonate.updateDraftStatus', $this->id), "PATCH", 'fa-solid fa-cloud-arrow-down'):
                new LinkObject("PublishLink", "Make Published", route('adminDonate.updatePublishStatus', $this->id), "PATCH", 'fa-solid fa-cloud-arrow-up');
    }

    public function toArray($request)
    {
        return [
            'slug' => $this->slug,
            'company_name' => $this->company_name,
            'accounts_name' => $this->accounts_name,
            'account_number' => $this->account_number,
            'branch_name' => $this->branch_name,
            'publishStatus' => $this->publish_status,
            'links' => array(
                new LinkObject("show", "View Post",route('adminDonate.show', $this->id), "GET", 'fa-solid fa-eye'),
                Auth::user()?->role === 'Super Admin' || Auth::user()?->role === 'Admin' || Auth::user()?->role === 'Content Manager' || Auth::user()?->role === 'Content Creator' ? new LinkObject("update", "Update Post", route('adminDonate.edit', $this->id), "PUT", 'fa-solid fa-pen-to-square') : null,
                $this->getStatus(),
                Auth::user()?->role === 'Super Admin' ? new LinkObject("destroy", "Delete Post", route('adminDonate.destroy', $this->id), "DELETE", 'fa-solid fa-trash-can') : null,
            ),
        ];
    }
}
