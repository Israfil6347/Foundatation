<?php

namespace App\Http\Resources\Publication;

use App\Utilities\LinkObject;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class AdminPublicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'order' => $this->order,
            'subtitle' => $this->subtitle,
            'body' => $this->body,
            'summary' => $this->summary,
            'button_text' => $this->summary,
            'button_link' => $this->summary,
            'attachment_url' => $this->attachment_url,
            'publishStatus' => $this->publish_status,
            'links' => [
                new LinkObject("index", "Pages", route('adminPublication.index'), "GET", 'fa-solid fa-list-ul'),
                new LinkObject("show", "View Post",route('adminPublication.show', $this->id), "GET", 'fa-solid fa-eye'),
                $this->publish_status === "Published"?  new LinkObject("draft", "Make Draft", route('adminPublication.updateDraftStatus', $this->id), "PATCH", 'fa-solid fa-cloud-arrow-down'):
                new LinkObject("PublishLink", "Publish", route('adminPublication.updatePublishStatus', $this->id), "PATCH", 'fa-solid fa-cloud-arrow-up'),
                Auth::user()?->role === 'Super Admin' || Auth::user()?->role === 'Admin' || Auth::user()?->role === 'Content Manager' || 
                Auth::user()?->role === 'Content Creator' ?
                 new LinkObject("edit", "Edit Page", route('adminPublication.edit', $this->id), "GET", 'fa-solid fa-pen-to-square') : null,
                Auth::user()?->role === 'Super Admin' ? new LinkObject("destroy", "Delete Page", route('adminPublication.destroy', $this->id), "DELETE", 'fa-solid fa-trash-can') : null,
            ],
        ];
    }
}
