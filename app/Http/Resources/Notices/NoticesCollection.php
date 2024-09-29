<?php

namespace App\Http\Resources\Notices;

use App\Utilities\LinkObject;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;

class NoticesCollection extends JsonResource
{

    private function getStatus()
    {
       return $this->publish_status === "Published"? new LinkObject("draft", "Make Draft", route('adminNotices.updateDraftStatus', $this->id), "PATCH", 'fa-solid fa-cloud-arrow-down'):
                new LinkObject("PublishLink", "Make Published", route('adminNotices.updatePublishStatus', $this->id), "PATCH", 'fa-solid fa-cloud-arrow-up');
    }

    public function toArray($request)
    {
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'order' => $this->order,
            'attachment_url' => $this->attachment_url,
            'attachment_mime' =>$this->attachment_mime,
            'publishStatus' => $this->publish_status,
            'body' => $this->body,
            'summary' => $this->summary,
            'subtitle' => $this->subtitle,
            'links' => array(
                new LinkObject("show", "View Post",route('adminNotice.show', $this->id), "GET", 'fa-solid fa-eye'),
                Auth::user()?->role === 'Super Admin' || Auth::user()?->role === 'Admin' || Auth::user()?->role === 'Content Manager' || Auth::user()?->role === 'Content Creator' ? new LinkObject("update", "Update Post", route('adminNotice.edit', $this->id), "PUT", 'fa-solid fa-pen-to-square') : null,
                $this->getStatus(),
                Auth::user()?->role === 'Super Admin' ? new LinkObject("destroy", "Delete Post", route('adminNotice.destroy', $this->id), "DELETE", 'fa-solid fa-trash-can') : null,
            ),
        ];
    }
}
