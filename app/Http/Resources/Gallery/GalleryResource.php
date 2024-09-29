<?php

namespace App\Http\Resources\Gallery;

use App\Utilities\LinkObject;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class GalleryResource extends JsonResource
{
    // private function getAttachment()
    // {
    //     return $this->attachments->map(function ($attachment) {
    //         return [
    //             'id' => $attachment->id,
    //             'title' => $attachment->title,
    //             'subtitle' => $attachment->subtitle,
    //             'attachment_name' => $attachment->attachment_name,
    //             'attachment_path' => $attachment->attachment_path,
    //             'attachment_url' => $attachment->attachment_url,
    //             'attachment_mime' => $attachment->attachment_mime,
    //             'links' => [
    //                 new LinkObject(
    //                     "update",
    //                     "Update Post",
    //                     route('adminGalleryImage.edit', $attachment->id),
    //                     "PUT",
    //                     'fa-solid fa-pen-to-square'
    //                 ),
    //                 new LinkObject(
    //                     "destroy", 
    //                     "Delete Page", 
    //                     route('galleryImageAttachment.delateGalleryImageAttachment', $attachment->id), 
    //                     "DELETE", 
    //                     'fa-solid fa-trash-can'
    //                 )
                  
    //             ],
    //         ];
    //     });
    // }
 
    public function toArray($request)
    {
      
        return [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'slug' => $this->slug,
            'order' => $this->order,     
            'publishStatus' => $this->publish_status,
            // "attachments"=>$this->getAttachment(),
            "attachments"=> GalleryAttachmentCollection::collection($this->attachments),
            'attachment_url' => $this->attachment_url,
            'links' => [
                new LinkObject("index", "Pages", route('adminGalleryImage.index'), "GET", 'fa-solid fa-list-ul'),
                new LinkObject("show", "View Post",route('adminGalleryImage.show', $this->id), "GET", 'fa-solid fa-eye'),
                $this->publish_status === "Published"?  new LinkObject("draft", "Make Draft", route('adminGalleryImage.updateDraftStatus', $this->id), "PATCH", 'fa-solid fa-cloud-arrow-down'):
                new LinkObject("PublishLink", "Publish", route('adminGalleryImage.updatePublishStatus', $this->id), "PATCH", 'fa-solid fa-cloud-arrow-up'),
                Auth::user()?->role === 'Super Admin' || Auth::user()?->role === 'Admin' || Auth::user()?->role === 'Content Manager' || 
                Auth::user()?->role === 'Content Creator' ?
                 new LinkObject("edit", "Edit Page", route('adminGalleryImage.edit', $this->id), "GET", 'fa-solid fa-pen-to-square') : null,
                Auth::user()?->role === 'Super Admin' ? new LinkObject("destroy", "Delete Page", '', "DELETE", 'fa-solid fa-trash-can') : null,
            ],
        ];
    }
}
