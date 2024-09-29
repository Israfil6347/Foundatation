<?php

namespace App\Http\Resources\Donate;

use App\Utilities\LinkObject;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class DonateResource extends JsonResource
{
 
    public function toArray($request)
    {
        
        return [
            'slug' => $this->slug,
            'id' => $this->id,
            'company_name' => $this->company_name,
            'accounts_name' => $this->accounts_name,
            'account_number' => $this->account_number,
            'branch_name' => $this->branch_name,
            'publishStatus' => $this->publish_status,
            'links' => [
                new LinkObject("index", "Pages", route('adminDonate.index'), "GET", 'fa-solid fa-list-ul'),
                new LinkObject("show", "View Post",route('adminDonate.show', $this->id), "GET", 'fa-solid fa-eye'),
                $this->publish_status === "Published"?  new LinkObject("draft", "Make Draft", route('adminDonate.updateDraftStatus', $this->id), "PATCH", 'fa-solid fa-cloud-arrow-down'):
                new LinkObject("PublishLink", "Publish", '', "PATCH", 'fa-solid fa-cloud-arrow-up'),
                Auth::user()?->role === 'Super Admin' || Auth::user()?->role === 'Admin' || Auth::user()?->role === 'Content Manager' || 
                Auth::user()?->role === 'Content Creator' ?
                 new LinkObject("edit", "Edit Page", route('adminDonate.edit', $this->id), "GET", 'fa-solid fa-pen-to-square') : null,
                Auth::user()?->role === 'Super Admin' ? new LinkObject("destroy", "Delete Page", '', "DELETE", 'fa-solid fa-trash-can') : null,
            ],
        ];
    }
}
