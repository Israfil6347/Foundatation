<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryAttachment extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'title', 'subtitle', 'attachment_name', 'attachment_path', 'attachment_mime', 'attachment_url', 'gallery_id'
    ];

    public function attachments()
    {
        return $this->belongsTo(Gallery::class);
    }
}
