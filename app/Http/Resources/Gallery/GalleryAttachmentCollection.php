<?php

namespace App\Http\Resources\Gallery;

use App\Utilities\LinkObject;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;

class GalleryAttachmentCollection extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
                'id' => $this->id,
                'title' => $this->title,
                'subtitle' => $this->subtitle,
                'attachment_name' => $this->attachment_name,
                'attachment_path' => $this->attachment_path,
                'attachment_url' => $this->attachment_url,
                'attachment_mime' => $this->attachment_mime,
                'links' => [
                    new LinkObject(
                        "destroy", 
                        "Delete Page", 
                        route('pages.updatePublishStatus', $this->id), 
                        "DELETE", 
                        'fa-solid fa-trash-can'
                    ),
                ],
            ];
    }
}
