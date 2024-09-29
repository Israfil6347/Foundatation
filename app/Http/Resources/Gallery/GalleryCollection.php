<?php

namespace App\Http\Resources\Gallery;

use App\Utilities\LinkObject;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class GalleryCollection extends JsonResource
{
     private function getStatus()
    {
       return $this->publish_status === "Published"? new LinkObject("draft", "Make Draft", route('adminGalleryImage.updateDraftStatus', $this->id), "PATCH", 'fa-solid fa-cloud-arrow-down'):
        new LinkObject("PublishLink", "Make Published", route('adminGalleryImage.updatePublishStatus', $this->id), "PATCH", 'fa-solid fa-cloud-arrow-up');
    }
  

    public function toArray($request)
    {
         return [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'slug' => $this->slug,
            'order' => $this->order,
            'publishStatus' => $this->publish_status,
            'links' => array(
                new LinkObject("show", "View Post",route('adminGalleryImage.show', $this->id), "GET", 'fa-solid fa-eye'),
                Auth::user()?->role === 'Super Admin' || Auth::user()?->role === 'Admin' || 
                Auth::user()?->role === 'Content Manager' || Auth::user()?->role === 'Content Creator' ? new LinkObject("update", "Update Post", route('adminGalleryImage.edit', $this->id), "PUT", 'fa-solid fa-pen-to-square') : null,
                $this->getStatus(),
                Auth::user()?->role === 'Super Admin' ? new LinkObject("destroy", "Delete Post", route('adminGalleryImage.destroy', $this->id), "DELETE", 'fa-solid fa-trash-can') : null,
            ),
        ];
    }
}
