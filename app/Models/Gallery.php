<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'title', 'slug', 'order', 'subtitle', 'attachment_url',
        'attachment_path', 'attachment_name', 'attachment_mime', 'publish_status'
    ];

    // One Gallery has many attachments
    public function attachments()
    {
        return $this->hasMany(GalleryAttachment::class);
    }
}
